import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    console.log('handleSubmit: ', $('#search').val());
    e.preventDefault();
    let input = $('#search').val();
    if (input.substring(0, 3) === '/c ') {
      input = input.substring(3, input.length);
      this.openChat(this.props.username, input, '/c ');
    } else if (input.substring(0, 3) === '/j ') {
      input = input.substring(3, input.length);
      this.openChat(this.props.username, input, '/j ');
    } else {
      this.openChat(this.props.username, input);
    }
    $('#search').val('');
  }

  openChat(username, chatname, type) {
    axios.post('/openChat', {
      username,
      chatname,
      type,
    })
      .then((res) => {
        if (res.data.error !== undefined) {
          console.log(res.data.error);
        } else if (res.data.members === undefined) {
          this.props.addPrivateChat(res.data);
        } else {
          this.props.addGroupChat(res.data);
        }
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input id="search" className="input field" placeholder="find a user or group"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const usersById = state.users.byId;
  return {
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
    friends: usersById,
  };
};

const SearchConnected = connect(mapStateToProps)(Search);

export default SearchConnected;
