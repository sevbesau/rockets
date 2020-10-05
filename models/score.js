const { Schema, model } = require('mongoose');

const ScoreSchema = new Schema({
  points: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'games',
  }
});

const Score = model('score', ScoreSchema);
module.exports = Score;