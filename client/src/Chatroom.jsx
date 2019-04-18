import React, { Component } from 'react'
import { connect } from 'react-redux';

import ChatMessage from './Components/ChatMessage';
import ChatInput from './Components/ChatInput';

import { sendMessage } from './store/actions/messageActions';
import { displayUserLoginForm } from './store/actions/userActions';

import sample_chat from './test-data';
import socket from './socket';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './scrollbar.scss';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    const { init_messages } = this.props;
    this.state = {
      chat_messages: init_messages ? init_messages : sample_chat,
      server_status: false
    }
    this.submitMessage = this.submitMessage.bind(this);
    this.scrollToDown = this.scrollToDown.bind(this);
    this.toggleInput = this.toggleInput.bind(this);

    this.scrollbars = React.createRef();
  }

  componentDidMount() {
    this.scrollToDown();
    this.toggleInput();
  }

  submitMessage(e) {
    e.preventDefault();

    const message_val = this.refs.msg.value;

    socket.emit('message/ADD', {
      username: this.props.username, message: message_val
    })

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

  toggleInput() {
    socket.on('connect', () => {
      console.log('server online');
      this.setState({ server_status: true })
    })
    socket.on('disconnect', () => {
      console.log('server offline');
      this.setState({ server_status: false })
    })
  }

  onLoginClick(e) {
    e.preventDefault();
  }

  render() {

    const { chat_messages, server_status } = this.state;
    const { username, loggedIn } = this.props;

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
              { chat_messages.map((message, i) =>
                <ChatMessage key={ i }>{ message }</ChatMessage>
              ) }
            </ul>
          </PerfectScrollbar>
        </div>

        <div className="composer">
          <form onSubmit={ this.submitMessage } className="message-form">

            <ChatInput
              loggedIn={ loggedIn }
              server_status={ server_status }
              onClick={ this.onLoginClick }
            />

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  presence: state.presence
})

export default connect(mapStateToProps, {
  sendMessage, displayUserLoginForm
})(Chatroom);