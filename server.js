const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

io.on('connection', socket => {

  socket.on('username', username => {
    socket.username = username;
    io.emit('user_status', `[[ ${socket.username} entered chat ]]`);
  })

  socket.on('disconnect', username => {
    io.emit('user_status', `[[ ${socket.username} left chat ]]`);
  })

  socket.on('chat_message', message => {
    io.emit('chat_message', { username: socket.username, message });
  })

})

server.listen(8080, () => {
  console.log('listening on 8080');
})