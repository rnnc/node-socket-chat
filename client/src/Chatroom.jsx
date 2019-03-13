import React, { Component } from 'react'

/* import Messages from './Components/Messages'; */

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './scrollbar.scss';

import sample_chat from './test-data';

export default class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        'lorem',
        'ipsum',
        'dolor',
        'consectetur',
        'adipiscing',
        'curabitur',
        'hendrerit',
        'libero',
        'eleifend',
        'blandit',
        'ornare',
        'gravida',
        'imperdiet',
        'nullam',
        'purus',
        'lacinia',
        'pretium',
        'congue',
        'praesent',
        'sagittis',
        'laoreet',
        'auctor',
        'mauris',
        'velit',
      ],
      chat_messages: sample_chat
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    const message_val = this.refs.msg.value;

    if (message_val)
      this.addNewMessages(message_val)

    this.refs.msg.value = '';
  }

  addNewMessages(message) {
    const nMessages = [...this.state.messages, message];
    this.setState({ messages: nMessages });
  }

  render() {

    const { messages } = this.state;
    const { username } = this.props;

    return (
      <div className="chat-wrapper">
        <div className="username">
          Username : { username }
        </div>

        <div className="chat">

          <PerfectScrollbar>
            <ul className="messages">
              { messages.map((msg, i) => (
                <li key={ i }>{ msg }</li>
              )) }
            </ul>

          </PerfectScrollbar>
        </div>

        <div className="composer">
          <form onSubmit={ this.handleSubmit } className="message-form">
            <input type="text" maxLength={ 250 }
              autoComplete="off"
              ref="msg"
              placeholder="Type a message..."
            />
          </form>
        </div>
      </div>
    )
  }
}
