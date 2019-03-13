import React, { Component } from 'react'

export default class Input extends Component {
  state = {
    text: ""
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div>
        <form onSubmit={ e => this.onSubmit(e) }>
          <input
            onChange={ e => this.onChange(e) }
            value={ this.state.text }
            type="text"
            placeholder="Type a message..."
          />
        </form>
      </div>
    )
  }
}
