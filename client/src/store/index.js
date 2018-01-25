import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from '../reducers';


const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    createLogger(),
  ),
);

export default store;

/*

  demoState = {
    user: {
      _id: 5,
      username: 'Jon',
      oathId: 'whatever',
    },
    notes: {
      byId: {
        3: {
          _id: 3,
          userId: 5,
          subject: 'English',
          heading: 'Predicate Nominatives',
          body: 'Lorem Ipsum...',
        },
        5: {
          _id: 5,
          userId: 5,
          subject: 'Comp Sci',
          heading: 'Higher order functions',
          body: 'Lorem Ipsum...',
        }
      },
      currentNote: 5,
      allIds: [3, 5],
    },
    decks: {
      byId: {
        7: {
          _id: 7,
          userId: 5,
          subject: 'Physics',
          title: 'Kinematics',
        },
        10: {
          _id: 10,
          userId: 5,
          subject: 'Math',
          title: 'Derivatives',
        },
      },
      currentDeck: 10,
      allIds: [7, 10],
    },
    flashcards: {
      byId: {
        11: {
          _id: 11,
          deckId: 7,
          front: 'Sciency Question',
          back: 'Sciency Answer',
        },
        13: {
          _id: 13,
          deckId: 7,
          front: 'Another Sciency Question',
          back: 'Another Sciency Answer',
        },
        17: {
          _id: 17,
          deckId: 10,
          front: 'Math Question',
          back: 'Math Answer',
        },
        20: {
          _id: 20,
          deckId: 10,
          front: 'Another Math Question',
          back: 'Another Math Answer',
        },
      },
      currentFlashcard: 17,
      allIds[11, 13, 17, 20],
    }
    videos: {
      byId: {
        10: {
          _id: 10,
          userId: 5,
          title: 'Video Title',
          url: 'https://www.youtube.com/somethingfromyoutube,
          starred: true,
        }
      },
      currentVideo: 10,
      allIds: [10],
    },
    messages: {
      byId: {
        8: {
          _id: 8,
          userId: 5,
          senTFrom: 10,  <-- id of user who sent message
          timeSent: 2131244325, <-- probably wont need this for now
          messageBody: 'Lorem Ipsum...',
          hasBeenRead: false,
        }
      },
      currentMessage: 8,
      allIds: [8],
    },
  }

*/
