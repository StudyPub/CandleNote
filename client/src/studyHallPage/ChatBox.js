import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux';
import Message from './Message';
import { setMessages } from '../actions/messagesActions';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    if (props.socket !== undefined) {
      props.socket.on('receive message', (data) => {
        if (data.sentBy === this.props.chat) {
          this.setState({ messages: this.state.messages.concat([data]) });
          this.updateScroll();
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      text: $('#message').val(),
      to: this.props.chat,
      sentBy: this.props.username,
    };
    this.props.socket.emit('send message', msg);
    this.setState({ messages: this.state.messages.concat([msg]) });
    $('#message').val('');
    // setTimeout(this.updateScroll, 200);
  }

  updateScroll = () => {
    const chatbox = document.getElementById('chatBox');
    // console.log('chatbox.scrollHeight ', chatbox.scrollHeight);
    // console.log('chatbox.clientHeight ', chatbox.clientHeight);
    // const isScrolledToBottom = chatbox.scrollHeight - chatbox.clientHeight <= chatbox.scrollTop + 1;
    // if (!isScrolledToBottom) {
    //   console.log('updateScroll ran: ', chatbox.scrollHeight, ' ', chatbox.clientHeight);
      chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
    // }
  }

  componentDidUpdate() {
    console.log('ran');
    const chatbox = document.getElementById('chatBox');
    chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.messages.length !== this.state.messages.length) {
      this.setState({ messages: newProps.messages });
    }
    if (newProps.chat !== this.props.chat) {
      this.getMessages(newProps.chat);
    }
    // this.updateScroll();
  }

  getMessages(to) {
    return axios.get(`/loadChatHistory?sentBy=${this.props.username}&&to=${to}`) // `/username?id=${this.props.username}`
      .then((messages) => {
        const messageInfo = messages.data;
        this.props.loadMessages(messageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="chatHeader">
          <div>{this.props.chat}</div>
        </div>
        <div className="chatMessages scroll" id="chatBox">
          {this.state.messages.map((message, i) => (
            <Message key={i} message={message}/>
          ))}
        </div>
        <div className="chatInput">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="message" className="input" placeholder="type a message" autoComplete="off"></input>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  { loadMessages: messageInfo => dispatch(setMessages(messageInfo)) }
);

const mapStateToProps = (state) => {
  const messagesById = state.messages.byId;
  const messagesForChat = Object.keys(messagesById).map(key => messagesById[key]);
  return {
    messages: messagesForChat,
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
  };
};

const ChatBoxConnected = connect(mapStateToProps, mapDispatchToProps)(ChatBox);

export default ChatBoxConnected;

   //         <textarea rows='5' id="message" className="input" placeholder="type a message" autoComplete="off"></textarea>
