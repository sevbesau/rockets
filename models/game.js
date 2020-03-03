const { DataTypes } = require('sequelize');
const dBconnection = require('./databaseConnection');

module.exports = dBconnection.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  timestamps: false,
});
