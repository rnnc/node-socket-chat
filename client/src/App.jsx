import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      messages: ['hello', 'how', 'are', 'you'],
      currentMsg: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //const username = prompt('Enter username');
    const username = 'rohan';
    this.setState({ username });
  }

  handleChange(e) {

    if (e.key === 'Enter') {
      console.log('enter');
      this.addNewMessages(e.target.value);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ currentMsg: e.target.Value });

  }

  addNewMessages(message) {
    console.log(message);
    const nMessages = [...this.state.messages, message];
    this.setState({ messages: nMessages });
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
            { messages.map((msg, i) => (
              <li key={ i }>{ msg }</li>
            )) }
          </ul>
        </div>
        <div className="composer">
          <form onSubmit={ this.handleSubmit } className="message-form">
            <input type="text" maxLength={ 250 }
              autoComplete={ false }
              value={ this.state.currentMsg }
              onChange={ this.handleChange }
              placeholder="Type a message..."
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
