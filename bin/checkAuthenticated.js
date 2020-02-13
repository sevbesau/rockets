module.exports.checkAuthenticated = function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.reqirect('/login');
}