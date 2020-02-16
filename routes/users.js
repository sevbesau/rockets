const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

// DATABASE !!!!!!!!!!

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

// route to get the login page
router.get('/login', (req, res) => {
  res.render('login', {});
})

// route to get the register page
router.get('/register', (req, res) => {
  res.render('register', {});
})

// route for the login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/game/lobby',
  failureRedirect: '/users/login',
  failureFlash: true
}));

// route for the register form
router.post('/register', async (req, res) => {
  // TODO validate inputs
  // VALIDATE does email exist in database?



  // TODO remove debug account
  let pw = await bcrypt.hash("admin", 10);
  users.push({
    id: Date.now().toString(),
    name: "admin", 
    email: "admin@admin.com",
    password: pw
  })


  const { name, email, password, password2 } = req.body;
  let errors = [];

  console.log(name)
  // are all the fields filled in?
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill out all fields.' });
  }
  // is the password long enough?
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters.' });
  }
  // do the passwords match?
  if (password !== password2) {
    errors.push({ msg: 'Passwords must match.'})
  }

  if (errors.length > 0) {
    // TODO pass filled in fields to re render, so they dont get lost
    res.render('register', { errors, name, email, password, password2 })
  } else {
    // validation passed
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name, 
        email: req.body.email,
        password: hashedPassword
      })
      req.flash('success_msg', 'You are now registered and can log in')
      res.redirect('/users/login');
    } catch {
      errors.push({ msg: "Oops, something went wrong, please try again."})
      res.render('register', { errors, name, email, password, password2 })
    }
  }

  
})

module.exports = router;