const express = require('express');
const router = express.Router();
const { getUserData } = require('../bin/util');

/**
 * Middelware to check if a user is logged in, 
 * if there is noone logged in, redirect to login page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // TODO add flash message
  res.redirect('/users/login');
}

/**
 * contains all the routes for the game related pages
 */

router.get('/spacewars', (req, res) => {
  res.render('spacewars', getUserData(req));
  //res.render('game', {loggedIn: true, username: req.user.name});
});

router.get('/snake', (req, res) => {
  res.render('snake', getUserData(req));
})

module.exports = router;