import React from 'react';

function TextInput(props) {

  const { server_status } = props;

  return (
    <input
    className={ `main-chat-input ${server_status ? 'online' : 'offline'}` }
    type="text" maxLength={ 250 }
    autoComplete="off"
    ref="msg"
    disabled={ !server_status }
    placeholder={
      server_status
        ? "Type a message..."
        : "Disconnected, Server Offline. Reconnecting..."
    }
    />
  )
}

export default function ChatInput(props) {
  const { loggedIn, server_status, onClick } = props;

  return (
    loggedIn
      ? <TextInput server_status={ server_status }/>
      : <button className="login-button" onClick={ onClick }>
          Click to Sign In
        </button>
  )
}