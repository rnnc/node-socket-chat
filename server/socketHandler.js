const {
  SOCKET_INIT_CHAT,
  SOCKET_CONNECTED,
  SOCKET_SEND_MESSAGE,
  SOCKET_USER_LOGIN_STATUS,
  SOCKET_PRESENCE_USERS_ADD,
  SOCKET_PRESENCE_USERS_REMOVE
} = require('./constants/socket_events');

module.exports.default = (io) => {
  io.on('connection', (socket) => {

  });
};