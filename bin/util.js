/**
 * helper funtion that generates a random integer between 0 and the given maximum 
 * @param {int} max the maximum value for the generated int
 */
module.exports.randomInt = function(max) {
  return Math.floor(Math.random()*max);
}

module.exports.getUserData = function(req) {
  return {
    loggedIn: req.isAuthenticated(), 
    username: req.isAuthenticated() ? req.user.name : undefined
  }
}