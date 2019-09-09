const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const socketio = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

require('dotenv').config();

// DEV USE ONLY!
app.use(require('cors')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./passport')(passport);

app.use('/api', routes);

if (process.env.NODE_ENV == "production")
  app.use(express.static(path.join(__dirname, 'client/build')));


/* app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
 */

/* DB CONNECTION */
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((promise) => { console.log(`\n_Connected to DB (Mongo)_\n`) },
    (error) => console.log(`\n[ Error connecting to database\n${error} ]\n`));

const server = http.createServer(app);

// start socket & pass to socketHandler
const io = socketio(server);
io.origins('*:*');
require('./socketHandler')(io);


server.listen(8080, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log('Socket Listening on 8080');
})
