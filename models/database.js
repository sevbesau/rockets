const bcrypt = require('bcrypt');
const User = require('./user');
//const Score = require('./score');
//const Game = require('./game');

/**
 * Associations
 */
//module.exports.initialize = async () => {
  // set up associations for score
  //User.hasMany(Score);
  //Game.hasMany(Score);
  //Score.belongsTo(User);
  //Score.belongsTo(Game);
  // sync();
//};

// DEBUGGING
// eslint-disable-next-line no-unused-vars
//const sync = async () => {
  // make the tables in the database match our models
  // force: drop the table and create a new one if exists
  //await User.sync({ force: true });
  //await Game.sync({ force: true });
  //await Score.sync({ force: true });
//};

/**
 * Game stuff
 */

module.exports.createGame = async (title) => {
  const exists = await this.getGameByTitle(title);
  if (!exists) {
    await Game.create({ title });
  }
};

module.exports.getGameByTitle = async (title) => {
  const response = await Game.findOne({ where: { title } });
  if (!response) {
    return null;
  }
  return response;
};

/**
 * Score stuff
 */

module.exports.createScore = async (score, gameTitle, userId) => {
  const newScore = await Score.create({ score });
  await newScore.setGame(await this.getGameByTitle(gameTitle));
  await newScore.setUser(await this.getUserById(userId));
};

module.exports.getScoresByGameTitle = async (gameTitle) => {
  const response = await Game.findAll({
    where: { title: gameTitle },
    include: Score,
  });
  return response;
};

/**
 * User stuff
 */

module.exports.createUser = async (email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = User({
    email,
    username,
    password: hashedPassword,
  });
  const user = await newUser.save();
};

// TODO
module.exports.getUserById = async (id) => {
  const response = await User.findById(id);
  if (!response) return null;
  return response;
};

// TODO
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
