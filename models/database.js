const bcrypt = require('bcrypt');
const User = require('./user');
const Score = require('./score');
const Game = require('./game');

/**
 * Associations
 */
module.exports.initialize = async () => {
  // make the tables in the database match our models
  // force: drop the table and create a new one if exists
  // await User.sync({ force: true })
  // await Game.sync({ force: true });
  // await Score.sync({ force: true });

  User.hasMany(Score, { allowNull: false });
  Game.hasMany(Score, { allowNull: false });
  Score.belongsTo(User, { allowNull: false });
  Score.belongsTo(Game, { allowNull: false });


};

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
  await score.setGame(await this.getGameByTitle(gameTitle));
  await score.setUser(await this.getUserById(userId));
  newScore.save();
};

module.exports.getScoresByGameTitle = async (gameTitle) => {
  const response = await Game.findAll({
    where: { title: gameTitle },
    include: Score,
  });
  console.log(response);
};

/**
 * User stuff
 */

module.exports.createUser = async (email, username, password) => {
  // TODO dont create duplicate users
  const hashedPassword = await bcrypt.hash(password, 10); // encypt the password
  await User.create({
    email,
    username,
    password: hashedPassword,
  });
};

module.exports.getUserById = async (id) => {
  const response = await User.findOne({ where: { id } });
  return response;
};

module.exports.getUserByEmail = async (email) => {
  const response = await User.findOne({ where: { email } });
  if (!response) return null;
  return response;
};

module.exports.getUserByName = async (username) => {
  const response = await User.findOne({ where: { username } });
  if (!response) return null;
  return response;
};
