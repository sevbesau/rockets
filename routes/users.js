const express = require('express');
const passport = require('passport');
const { getUserData, isAuthenticated } = require('../bin/util');
// const { sanitize } = require('../bin/util');
const { createUser, getUserByUsername, deleteUserById } = require('../models/database');

const router = express.Router();

// route to get the login page
router.get('/login', (req, res) => {
  res.render('login', {});
});

// route for the login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
}));

// route to get the register page
router.get('/register', (req, res) => {
  res.render('register', {});
});

// route for the register form
router.post('/register', async (req, res) => {
  const {
    errors, username, password, password2,
  } = await validateRegisterForm(req);
  if (errors.length > 0) {
    // invalid form
    res.render('register', {
      errors, username, password, password2,
    });
  } else {
    // valid form
    try {
      await createUser(username, password); // add the user to the database
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/users/login');
    } catch (e) {
      errors.push({ msg: 'Oops, something went wrong, please try again.' });
      res.render('register', {
        errors, username, password, password2,
      });
    }
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
})

// route to render the account managing page
router.get('/:userId', isAuthenticated, (req, res) => {
  res.render('account', getUserData(req));
}); 

router.post('/:userId', isAuthenticated, async (req, res) => {
  // TODO validate form!
  await updateUserById(req.params.userId, req.body);
  res.render('account', getUserData(req));
})

router.get('/:userId/delete', isAuthenticated, (req, res) => {
  res.render('confirmDeleteAccount', getUserData(req));
})

router.post('/:userId/delete', isAuthenticated, async (req, res) => {
  await deleteUserById(req.params.userId);
  res.redirect('/');
});
  
/**
 * Check if all the fields contain the expected data types and formats
 * Also checks for duplicates in the database
 * @param {*} req the post request containg the user data
 */
async function validateRegisterForm(req) {
  const errors = [];
  const {
    username, password, password2,
  } = req.body;

  // are all the fields filled in?
  if (!username || !password || !password2) {
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
  // does a user with that username exist?
  const userByName = await getUserByUsername(username);
  if (userByName !== null) {
    errors.push({ msg: 'That username is already taken!' });
  }

  return {
    errors, username, password, password2,
  };
}
module.exports = router;
