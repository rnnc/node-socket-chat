import React, { Component } from 'react';

import Chatroom from './Chatroom';

import socket from './socket';

import './App.scss';
import './Components/Components.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      lastChatUser: null,
      loggedIn: false,
      chat_cache: [],
      userlist: []
    }
  }

  componentDidMount() {
    //const username = prompt('Enter username');
    const username = 'rohan';
    this.setState({ username });

    socket.on('INIT_CHAT', ({ cached_chat, user_list }) => {
      this.setState({
        chat_cache: cached_chat,
        userlist: user_list
      })
    })

    socket.on('connect', () => {
      socket.emit('user/ADD', { username });
      console.clear();
    })

    socket.on('user/LOGGED_IN', ({ status, error }) => {
      if (status)
        this.setState({
          loggedIn: true
        });
      else {
        if (error === "USERNAME_EXISTS") {
          console.error()
        }
      }
    })

    socket.on('presence/users/UPDATE', (users) => {
      this.setState({
        userlist: users
      })
    })
  }

  render() {

    const { username, lastChatUser, chat_cache, loggedIn } = this.state;

    return (
      <div className="main-app">
        <Chatroom loggedIn={ loggedIn } username={ username } lastChatUser={ lastChatUser } initMessages={ chat_cache } />
      </div>
    );
  }
}

export default App;
