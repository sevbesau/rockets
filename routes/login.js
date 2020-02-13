const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

router.get('/login', (req, res) => {
  res.render('login', {});
})

router.get('/register', (req, res) => {
  res.render('register', {});
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/game/lobby',
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