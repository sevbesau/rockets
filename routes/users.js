const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const database = require('../models/database');
const User = require('../models/user');
const { sanitize } = require('../bin/util');

const router = express.Router();

const initializePassport = require('../bin/passport-config');

// set up passport 
initializePassport(
  passport, 
  async email => {
    const response = await User.findAll({where: {email: email}});
    return response[0];
  },
  async id => {
    const response = await User.findAll({where: {id: id}});
    return response[0];
  }
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
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

/**
 * Check if all the fields contain the expected data types and formats
 * @param {*} req the post request containg the user data
 */
function validateRegisterForm(req) {
  // VALIDATE email
  // VALIDATE does email exist in database?
  let errors = [];
  console.log(req.body)
  const { username, email, password, password2 } = req.body;

  // are all the fields filled in?
 // if (!username || !email || !password || !password2) {
 //   errors.push({ msg: 'Please fill out all fields.' });
 // }
 // // do any of the fields contain an ; ?
 // if (username.contains(";") && email.contains(";") || password.contains(";")) {
 //   errors.push({msg: "Please dont use ';'"});
 // }
 // // is the password long enough?
 // if (password.length < 6) {
 //   errors.push({ msg: 'Password must be at least 6 characters.' });
 // }
 // // do the passwords match?
 // if (password !== password2) {
 //   errors.push({ msg: 'Passwords must match.'})
 // }
  return { errors, username, email, password };
}

// route for the register form
router.post('/register', async (req, res) => {
  const { errors, username, email, password, password2 } = validateRegisterForm(req);
  if (errors.length > 0) {
    // invalid form
    res.render('register', { errors, username, email, password, password2 })
  } else {
    // valid form
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({
        email: email,
        username: username,
        password: hashedPassword
      })
      await user.save();
      req.flash('success_msg', 'You are now registered and can log in')
      res.redirect('/users/login');
    } catch {
      errors.push({ msg: "Oops, something went wrong, please try again."})
      res.render('register', { errors, username, email, password, password2 })
    }
  }
})

module.exports = router;