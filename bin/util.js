/**
 * helper funtion that generates a random integer between 0 and the given maximum
 * @param {int} max the maximum value for the generated int
 */
module.exports.randomInt = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * builds an object containing information about the user to pass to a page
 */
module.exports.getUserData = function (req) {
  return {
    loggedIn: req.isAuthenticated(),
    user: req.isAuthenticated() ? req.user : undefined,
  };
};

module.exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) next();
  else res.sendStatus(403);
}
/**
 * Sanitizes the string so our database is protected
 */
module.exports.sanitize = function (str) {
  // TODO implement sanitizing;
  return str;
};
