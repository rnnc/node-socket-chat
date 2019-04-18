const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

const {
  SOCKET_INIT_CHAT,
  SOCKET_CONNECTED,
  SOCKET_SEND_MESSAGE,
  SOCKET_USER_LOGIN_STATUS,
  SOCKET_PRESENCE_USERS_ADD,
  SOCKET_PRESENCE_USERS_REMOVE
} = require('./constants/socket_events');

const { USERNAME_EXISTS } = require('./constants/errors');
// DEV USE ONLY!
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());

/* app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
 */
/* DB CONNECTION */

const db = require('./config').db;

// UNCOMMMENT TO CONNECT TO DB

/* mongoose
  .connect(db, { useNewUrlParser: true })
  .then((promise) => {
    console.log('CONNECTED TO DB (MONGO)')
  }, err => console.log(`Error connectign to database`, err)); */

/* Temporary Store */

const Messages = require('./models/Messages');
const Users = require('./models/Users');
const store = {
  users: [{ username: "admin" }],
  chat_cache: [
    { username: 'Asuncion', text: 'Hello' },
    { username: 'Cristine', text: 'How' },
    { username: 'Terrilyn', text: 'Are' },
    { username: 'Jamee', text: 'You' },
    { username: 'Ginette', text: '?' }
  ]
};

const MESSAGES = new Messages();
const USERS = new Users();

const io = socketio(server);
io.origins('*:*');
io.on('connection', socket => {

  const ip_add = socket.conn.transport.socket._socket.remoteAddress;
  console.log(`\njoined\nipaddress:${ip_add}\nsocket_id:${socket.id}\n`);

  socket.emit(SOCKET_CONNECTED, true);

  socket.emit(SOCKET_INIT_CHAT, chat_cache, users);

  socket.on(SOCKET_USER_LOGIN, (new_user_object) => {
    console.log(`\nuser/ADD\n${JSON.stringify(new_user_object, null, 2)}\n`)


    let nUser;
    try {
      nUser = USERS.addUser(new_user_object, socket.id);
    } catch (error) {
      if (error)
        socket.emit(SOCKET_USER_LOGIN_STATUS, { status: false, error })
      return;
    }

    // if logged in, get status
    socket.emit(SOCKET_USER_LOGIN_STATUS, { status: true });

    // update presence globally
    io.emit(SOCKET_PRESENCE_USERS_ADD, nUser);
  })

  socket.on(SOCKET_SEND_MESSAGE, (message_obj) => {
    const { username, message } = message_obj;
    console.log(`\nusername:${username}\nmessage:${message}\n`);
  })

  socket.on('PING', (text) => {
    /* const u = USERS.getUser(null, socket.id); */
    console.log(`\n${socket.id} - ${text}\n`);
    socket.emit('PONG', 'PONG');
  })

  socket.on('disconnect', () => {
    USERS.removeUser(socket.id)
  })

});


server.listen(8080, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on 8080');
})