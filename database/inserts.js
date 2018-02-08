const { Flashcards, Decks, Messages, User, Groups } = require('./index');

const insertFlashcard = ({ front, back, deckId, userId }) => (
  new Flashcards({
    front,
    back,
    deckId,
    userId,
  }).save()
);

const insertDeck = ({ subject, title, userId }) => (
  new Decks({
    subject,
    title,
    userId,
  }).save()
);

const saveMessage = ({ to, sentBy, text, timeStamp }) => {
  // add user to friends list (private chat) after receiving a message from them
  User.findOne({ username: to }, (err, user) => {
    if (err || user === null) {
      console.log('No users found by that name');
    } else {
      user.privateChats.addToSet({ username: sentBy });
      user.save();
    }
  });
  new Messages({
    to,
    sentBy,
    text,
    timeStamp,
  }).save();
};

const openPrivateChat = (username, otheruser, callback) => {
  User.findOne({ username }, (err, user) => {
    if (user.privateChats.includes(otheruser)) {
      callback(false);
    } else {
      User.findOne({ username: otheruser }, (error, doc) => {
        if (error || doc === null) {
          callback(false);
        } else {
          user.privateChats.addToSet({ username: doc.username });
          user.save();
          callback(true);
        }
      });
    }
  });
};

const addGroupMember = (groupname, username, callback) => {
  Groups.findOne({ groupname }, (err, group) => {
    if (group === null || group.members.includes(username)) {
      callback(false);
    } else if (group === null) {
      callback(false);
    } else {
      group.members.addToSet(username);
      group.save();
      User.findOne({ username }, (error, user) => {
        if (error) {
          console.log(err);
          callback(false);
        } else {
          user.groupChats.addToSet({ groupname });
          user.save();
          callback(true, group);
        }
      });
    }
  });
};

const createGroup = (groupname, username, callback) => {
  Groups.findOne({ groupname }, (err, group) => {
    if (err) {
      callback(false);
    // if group does not exist
    } else if (group === null) {
      // make new group
      new Groups({
        groupname,
        members: [username],
      }).save();
      // add group to user groups
      User.findOne({ username }, (error, user) => {
        if (err) {
          console.log(error);
          callback(false);
        } else {
          user.groupChats.addToSet({ groupname });
          user.save();
          callback(true, group);
        }
      });
    } else {
      console.log('group already exists');
      callback(false);
    }
  });
};

const saveAccessToken = ({ userId, token }) => User.findOne({ _id: userId })
  .then((doc) => {
    doc.set({ googleAccessToken: token });
    return doc.save();
  });

const addFriend = (userId, friendId) => User.findOne({ _id: userId })
  .then((user) => {
    user.friends.addToSet({
      friendId,
      status: 'accepted',
    });
    return user.save();
  });

module.exports = {
  insertDeck,
  insertFlashcard,
  saveAccessToken,
  saveMessage,
  openPrivateChat,
  addGroupMember,
  createGroup,
  addFriend,
};
