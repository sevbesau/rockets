const bcrypt = require('bcrypt');
const User = require("./user");
const Score = require('./score');
const Game = require('./game');

/**
 * Associations
 */
module.exports.initialize = async () => {
  User.hasMany(Score, {allowNull: false});
  Game.hasMany(Score, {allowNull: false});
  Score.belongsTo(User, {allowNull: false});
  Score.belongsTo(Game, {allowNull: false});
  
  /**
   * make the tables in the database match our models
   * force: drop the table and create a new one if exists
   */
  await User.sync()
  await Game.sync()
  await Score.sync()

}

/**
 * Game stuff
 */

module.exports.createGame = async (title) => {
  const newGame = await Game.create({ title });
  await newGame.save();
}

module.exports.getGameByTitle = async (title) => {
  const response = await Game.findOne({ where: { title } });
  console.log("found game: ",response[0])
  return response[0];
}

/**
 * Score stuff
 */

module.exports.createScore = async (score, gameTitle, userId) => {
  const newScore = await Score.create({ score })
  await score.setGame(await this.getGameByTitle(gameTitle));
  await score.setUser(await this.getUserById(userId));
  newScore.save();
}

module.exports.getScoresByGameTitle = async (gameTitle) => {
  const response = await Game.findAll({
    where: { title: gameTitle },
    include: Score
  });
  console.log(response);
}
 
/**
 * User stuff
 */

module.exports.createUser = async (email, username, password) => {
  // TODO dont create duplicate users
  const hashedPassword = await bcrypt.hash(password, 10) // encypt the password
  const newUser = await User.create({ // make a model of the user to store in the database
    email: email,
    username: username,
    password: hashedPassword
  })
  await newUser.save(); // save the user to the database
}

module.exports.getUserById = async (id) => {
  const response = await User.findAll({ where: { id } });
  return response[0];
}

module.exports.getUserByEmail = async (email) => {
  const response = await User.findAll({ where: { email } });
  return response[0];
}