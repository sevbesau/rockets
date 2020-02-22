const bcrypt = require('bcrypt');
const User = require("./user");

module.exports.createUser = async (email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10) // encypt the password
  const user = await User.create({ // make a model of the user to store in the database
    email: email,
    username: username,
    password: hashedPassword
  })
  await user.save(); // save the user to the database
}

module.exports.getUserById = async (id) => {
  const response = await User.findAll({where: {id: id}});
  return response[0];
}

module.exports.getUserByEmail = async (email) => {
  const response = await User.findAll({where: {email: email}});
  return response[0];
}