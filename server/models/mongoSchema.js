const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = ({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  joinedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  messagesSent: {
    type: Number,
    required: true,
    default: 0
  }
});

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model('users', UserSchema);
module.exports = Message = mongoose.model('messages', MessageSchema);
