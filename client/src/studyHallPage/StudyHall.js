import React from 'react';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';
import FriendsListConnected from './FriendsList';
import GroupsList from './GroupsList';
import Search from './Search';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat: '' };
  }

  changeChat(otherChat) {
    this.setState({ chat: otherChat });
  }

  render() {
    return (
      <div className="studyContainer">
        <div className="Groups studyComp">
          <GroupsList changeChat={this.changeChat.bind(this)}/>
        </div>
        <div className="Friends studyComp">
          <FriendsListConnected changeChat={this.changeChat.bind(this)}/>
        </div>
        <div className="Search studyComp">
          <Search />
        </div>
        <div className="Chat studyComp">
          <ChatBox chat={this.state.chat}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  { activeSocket: state.activeSocket.socket }
);

const StudyHallConnected = connect(mapStateToProps)(StudyHall);

export default StudyHallConnected;
