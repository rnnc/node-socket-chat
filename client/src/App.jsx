import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      messages: ['hello', 'how', 'are', 'you']
    }
  }
  componentDidMount() {
    const username = prompt('Enter username');
    this.setState({ username });
  }

  _handleKeyPress(e) {
    console.log(e.key);
  }

  messagesToComponents(messages) {
    return messages.map(msg => (
      <li>{ msg }</li>
    ))
  }

  render() {

    const { username, messages } = this.state;

    return (
      <div className="chat-wrapper">
        <div className="username">
          Username : { username }
        </div>
        <div className="chat">
          <ul className="messages">
            { messages.map(msg => (
              <li>{ msg }</li>
            )) }
          </ul>
        </div>
        <div className="message-box">
          <input type="text" onKeyPress={ this._handleKeyPress } />
        </div>
      </div>
    );
  }
}

export default App;
