const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
//const checkAuthenticated = ('../bin/checkAuthenticated');

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

const router = express.Router();

let users = []; // TODO move into database!!
// TODO sanitize form inputs!

const initializePassport = require('../bin/passport-config');

// set up passport // TODO what does passport do?
initializePassport(
  passport, 
  // TODO replace with database querrys
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

/**
 * contains all the routes that render pages
 */

router.get('/game', checkAuthenticated, (req, res) => {
  res.render('gameView', {loggedIn: true, username: req.user.name});
});

router.get('/lobby', checkAuthenticated, (req, res) => {
  res.render('lobbyView', {loggedIn: true, username: req.user.name});
})

router.get('/leaderboard', checkAuthenticated, (req, res) => {
  res.render('leaderboard', {loggedIn: true, username: req.user.name})
})

router.get('/login', (req, res) => {
  res.render('login', {});
})



router.get('/register', (req, res) => {
  res.render('register', {});
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/game',
  failureRedirect: 'login',
  failureFlash: true
}));

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name, 
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login');
  } catch {
    res.redirect('/register')
  }
})

module.exports = router;