import React, { Component } from 'react'

export default class Messages extends Component {
  render() {

    const { messages } = this.props;

    return (
      <ul className="messages">
        { messages.map((m) => renderMessage(m)) }
      </ul>
    )
  }

  renderMessage(message) {

    const { username, text, current_member } = message;

    return (
      <li className={ current_member ? "currentMember" : "" }>
        <div>
          { text }
        </div>
      </li>
    )
  }

}
