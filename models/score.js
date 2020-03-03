const { DataTypes } = require('sequelize');
const dBconnection = require('./databaseConnection');

module.exports = dBconnection.define('Score', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});
