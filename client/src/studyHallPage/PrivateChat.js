import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.privateChat.status || 'offline',
      unread: 0,
      selected: false,
    };
    this.startListeners = this.startListeners.bind(this);
  }

  updateUnread(nextProps = this.props.chat) {
    const friendName = this.props.privateChat.username;

    if (nextProps.chat === friendName) {
      this.setState({
        unread: 0,
        selected: true,
      });
    } else {
      axios.get(`/checkMessages?username=${this.props.username}&&chatName=${friendName}`)
        .then((messages) => {
          let count = 0;
          messages.data.forEach((message) => {
            if (message.readReciept === false) {
              count += 1;
            }
          });
          this.setState({
            unread: count,
            selected: false,
          });
        });
    }
  }

  componentDidMount() {
    this.updateUnread();
    this.startListeners();
  }

  componentWillReceiveProps(nextProps) {
    this.updateUnread(nextProps);
    window.setTimeout(this.startListeners, 300);
  }

  startListeners() {
    console.log('startListeners ran');
    const friendName = this.props.privateChat.username;

    this.props.socket.emit('pingFriend', {
      username: this.props.username,
      friend: friendName,
    });

    this.props.socket.on(`response ${friendName}`, (status) => {
      this.setState({ status });
    });

    this.props.socket.on(`${friendName} signed on`, () => {
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`${friendName} signed off`, () => {
      this.setState({ status: 'offline' });
    });

    this.props.socket.on(`${friendName} is away`, () => {
      console.log(`${friendName} is away`);
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`${friendName} is available`, () => {
      console.log(`${friendName} is available`);
      this.setState({ status: 'available' });
    });

    this.props.socket.on(`submitted message ${friendName}`, () => {
      if (this.props.chat !== friendName) {
        this.setState({ unread: this.state.unread += 1 });
      }
    });
  }

  select() {
    const { username } = this.props.privateChat;
    this.props.selectChat(username, 'private', '');
  }

  close() {
    this.props.closeChat(this.props.username, this.props.privateChat.username, 'private');
  }

  render() {
    return (
      <div className={`chatContainer chatSelected${this.state.selected}`}>
        <i className={`${this.state.status} circle icon`}></i>
        <span
          className='chatName'
          onClick={this.select.bind(this)}>
          {this.props.privateChat.username}
        </span>
        <span onClick={this.close.bind(this)} className='closeChat'>X</span>
        <span className={`numUnread numUnread${this.state.unread}`}>{this.state.unread}</span>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
  }
);

const PrivateChatConnected = connect(mapStateToProps)(PrivateChat);

export default PrivateChatConnected;
