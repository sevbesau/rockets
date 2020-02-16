const mysql = require('mysql');

/**
 * Connect to the mySql database
 */
function connect() {
  // mysql connection object
  const mysqlDB = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: '456189',
    database: 'games'
  })
  // make an actual connection using out connection object
  mysqlDB.connect((err) => {
    if (!err) {
      console.log('Database connection succes');
    } else {
      console.log('Database connection failed: '+JSON.stringify(err, undefined, 2));
    }
  })
}

/**
 * Returns all the users in the user table
 */
function getUsers() {
  const query = `SELECT * FROM user`;
  mysqlDB.query(query, (err, rows, fields) => {
    if (!err) {
      return rows;
    } else {
      console.log(err);
    }
  });
}

/**
 * Returns the users with the given email from the database 
 * @param {string} email 
 */
function getUserByEmail(email) {
  const query = `SELECT * FROM user WHERE email = ${email}`;
  mysqlDB.query(query, (err, rows, fields) => {
    if (!err) {
      // TODO only return user id?
      return rows;
    } else {
      console.log(err);
    }
  });
}

/**
 * Put a user in the database
 * @param {string} email 
 * @param {string} username 
 * @param {string} password 
 */
function putUser(email, username, password) {
  // TODO build put query string
  const query = `${email} ${username} ${password}`;
  mysqlDB.query(query, (err, rows, fields) => {
    if (!err) {
      return rows;
    } else {
      console.log(err);
    }
  });
}

/**
 * Delete a user from the database by id
 * @param {int} userid 
 */
function deleteUser(userid) {
  const query = `DELETE FROM user WHERE id = ${userid}`;
  mysqlDB.query(query, (err, rows, fields) => {
    if (!err) {
      console.log("Deleted user");
    } else {
      console.log(err);
    }
  });
}

module.exports = {
  connect, 
  putUser, 
  getUsers,
  getUserByEmail,
  deleteUser
}
