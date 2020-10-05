const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
});

const Game = model('game', GameSchema);
module.exports = Game;
