import React, { Component } from 'react'

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { current_user, children } = this.props;
    const { username, text } = children;
    
    return (
      <li >
        <div className="user-box">
          <span className="name"> { username } </span>
          <span className="time-box"> { "10:10" }</span>
        </div>
        <div className="text-box">
          <span className="message-text"> { text } </span>
        </div>
      </li>
    )
  }
}
