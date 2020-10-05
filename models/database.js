const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./user');
const Score = require('./score');
const Game = require('./game');
const Message = require('./message');

module.exports.connect = () => {
  mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('[mongodb] connected...'))
  .catch((err) => console.log('[mongodb] connection failed', err));
}

/**
 * Message
 */
module.exports.addMessage = async (message) => {
  const newMessage = Message(message);
  await newMessage.save();
};

module.exports.getMessages = async () => {
  const messages = await Message.find();
  if (!messages) return null;
  return messages;
};

/**
 * Game 
 */
module.exports.createGame = async (title) => {
  const newGame = await Game({ title });
  await newGame.save();
};

module.exports.getGames = async () => {
  const games = await Game.find();
  return games;
}

module.exports.getGameId = async (title) => {
  const response = await Game.findOne({ title });
  if (!response) return null;
  return response._id;
}


/**
 * Score
 */
module.exports.createScore = async (points, userId, gameTitle) => {
  const newScore = Score({ 
    points,
    userId,
    gameId: await this.getGameId(gameTitle),
  });
  await newScore.save();
}

module.exports.getScoresByGameName = async (game) => {
  const gameId = await this.getGameId(game);
  const scores = await Score.find({ gameId });
  if (!scores) return null;
  let scoresWithUsername = [];
  for (let score of scores) {
    scoresWithUsername.push({
      points: score.points,
      user: (await User.findById(score.userId)).username
    });
  }
  return scoresWithUsername;
};

module.exports.getScoreByUserId = async (game, userId) => {
  const gameId = await this.getGameId(game);
  const score = await Score.findOne({ gameId, userId });
  if (!score) return null;
  return score;
}

module.exports.updateScore = async (game, userId, points) => {
  const currentScore = await this.getScoreByUserId(game, userId);
  const highScore = await Score.findByIdAndUpdate({ _id: currentScore._id }, { points });
  return highScore;
}

module.exports.getHighScore = async (game) => {
  const gameId = await this.getGameId(game);
  const scores = await Score.find({ gameId });
  if (!scores[0]) {
    return null;
  }
  scores.sort((a, b) => parseInt(b.points) - parseInt(a.points));
  const owner = await User.findById(scores[0].userId);
  return { points: scores[0].points, owner: owner.username};
}

/**
 * User 
 */
module.exports.createUser = async (email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = User({
    email,
    username,
    password: hashedPassword,
  });
  await newUser.save();
};

module.exports.getUserById = async (id) => {
  const response = await User.findById(id);
  if (!response) return null;
  return response;
};

module.exports.getUserByEmail = async (email) => {
  const response = await User.findOne({ email: email });
  if (!response) return null;
  return response;
};

module.exports.getUserByName = async (username) => {
  const response = await User.findOne({ username: username });
  if (!response) return null;
  return response;
};
