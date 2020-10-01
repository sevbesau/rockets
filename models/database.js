const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./user');
//const Score = require('./score');
//const Game = require('./game');

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
