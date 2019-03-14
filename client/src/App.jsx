import React, { Component } from 'react';

import Chatroom from './Chatroom';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      lastChatUser: null
    }
    
  }

  componentDidMount() {
    //const username = prompt('Enter username');
    const username = 'rohan';
    this.setState({ username });
  }

  render() {

    const { username, lastChatUser } = this.state;

    return (
      <div className="main-app">
        <Chatroom username={ username } lastChatUser={ lastChatUser } />
      </div>
    );
  }
}

export default App;
