const express = require('express');
const passport = require('passport');
// const { sanitize } = require('../bin/util');
const { createUser, getUserByEmail, getUserByName } = require('../models/database');

const router = express.Router();

// route to get the login page
router.get('/login', (req, res) => {
  res.render('login', {});
});

// route to get the register page
router.get('/register', (req, res) => {
  res.render('register', {});
});

// route for the login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
}));

/**
 * Check if all the fields contain the expected data types and formats
 * Also checks for duplicates in the database
 * @param {*} req the post request containg the user data
 */
async function validateRegisterForm(req) {
  const errors = [];
  const {
    username, email, password, password2,
  } = req.body;

  // are all the fields filled in?
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill out all fields.' });
  }
  // is the password long enough?
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters.' });
  }
  // do the passwords match?
  if (password !== password2) {
    errors.push({ msg: 'Passwords dont match.' });
  }
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    errors.push({ msg: 'This is an invalid email' });
  }
  // does a user with that email already exist?
  const userByEmail = await getUserByEmail(email);
  if (userByEmail !== null) {
    errors.push({ msg: 'A user with this email already exists!' });
  }
  // does a user with that username exist?
  const userByName = await getUserByName(username);
  if (userByName !== null) {
    errors.push({ msg: 'That username is already taken!' });
  }

  return {
    errors, username, email, password, password2,
  };
}

// route for the register form
router.post('/register', async (req, res) => {
  const {
    errors, username, email, password, password2,
  } = await validateRegisterForm(req);
  if (errors.length > 0) {
    // invalid form
    res.render('register', {
      errors, username, email, password, password2,
    });
  } else {
    // valid form
    try {
      await createUser(email, username, password); // add the user to the database
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/users/login');
    } catch (e) {
      errors.push({ msg: 'Oops, something went wrong, please try again.' });
      res.render('register', {
        errors, username, email, password, password2,
      });
    }
  }
});

module.exports = router;
