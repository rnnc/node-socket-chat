module.exports = class Messages {
  constructor(messages) {
    this.messages = [];
    if (messages && Array.isArray(messages)) {
      initMessages(messages);
    }
  }

  initMessages(messages) {
    for (const msg of messages) {
      this.addMessage(msg);
    }
  }

  addMessage(data) {
    if (this.messages.length >= 26)
      this.messages.shift();
    this.trimMessages();
    this.messages.push(data);
  }

  trimMessages() {
    if (this.messages.length > 30)
      this.messages.shift();
  }

  get messageList() {
    return this.messages;
  }
}