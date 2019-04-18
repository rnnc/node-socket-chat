const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = ({
  name: {
    type: String,
    require: true
  },
  joinedDate: {
    type: Date,
    require: true,
    default: Date.now
  },
  email: {
    type: String
  },
  messagesSent: {
    type: Number,
    require: true,
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
