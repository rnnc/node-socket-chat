import React, { Component } from 'react'

import ChatMessage from './Components/ChatMessage';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './scrollbar.scss';

import sample_chat from './test-data';

export default class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_messages: sample_chat
    }
    this.submitMessage = this.submitMessage.bind(this);
    this.scrollToDown = this.scrollToDown.bind(this);
    this.scrollbars = React.createRef();
  }

  componentDidMount() {
    this.scrollToDown();
  }

  submitMessage(e) {
    e.preventDefault();

    const message_val = this.refs.msg.value;

    if (message_val)
      this.setState({
        chat_messages: this.state.chat_messages.concat([{
          username: this.props.username,
          text: message_val
        }])
      }, () => {
        this.refs.msg.value = '';
      });

    this.scrollToDown();
  }

  scrollToDown() {
    setTimeout(() => {
      this.scrollbars.scrollTop = this.scrollbars.scrollHeight;
    }, 10);
  }

  render() {

    const { chat_messages } = this.state;
    const { username } = this.props;

    return (
      <div className="chat-wrapper">
        <div className="username">
          Username : { username }
        </div>

        <div className="chat" >
          <PerfectScrollbar
            option={ { minScrollbarLength: 25, maxScrollbarLength: 50 } }
            containerRef={ (ref) => { this.scrollbars = ref } }
          >
            <ul className="messages"  >
              { chat_messages.map(message =>
                <ChatMessage>{ message }</ChatMessage>
              ) }
            </ul>
          </PerfectScrollbar>
        </div>

        <div className="composer">
          <form onSubmit={ this.submitMessage } className="message-form">
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