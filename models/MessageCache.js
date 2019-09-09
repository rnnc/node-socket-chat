const MESSAGE_CACHE_LIMIT = 45;

module.exports = class MessageCache {

  constructor(messages) {
    this.messages = [];
    if (messages)
      initMessages(messages);
  }

  /* To initialize from outside cache in case of server restart */
  initMessages(messages) {
    if (messages &&
      Array.isArray(messages) &&
      messages.length > 0
    )
      this.messages.push(...messages);
  }

  /* To enforce cache limits */
  trimMessages() {
    if (this.messages.length > MESSAGE_CACHE_LIMIT)
      this.messages.shift();
  }

  addMessage(data) {
    this.trimMessages();
    this.messages.push(data);
  }

  get messageList() {
    return this.messages;
  }
}