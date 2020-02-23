const { Sequelize } = require('sequelize');
//const User = require('./user');
/**
 * Connect to the mySql database
 */
const sequelize = new Sequelize('games', 'root', 'agdomnik', {
  host: 'localhost',
  dialect: 'mysql',
  freezeTableName: true, // use same name as model to addres database
  logging: msg => console.log(`[database] ${msg}`)
});

try {
  sequelize.authenticate();
  console.log('[database] connection succes');
} catch (error) {
  console.log('[database] connection failed:', error);
}

module.exports = sequelize;