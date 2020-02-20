const { DataTypes } = require('sequelize');
const sequelize = require('./database');

module.exports = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(40),
    allowNull: false
  }
}, {
  timestamps: false
})
 
