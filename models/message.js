const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Message = model('message', MessageSchema);
module.exports = Message;
