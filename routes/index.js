const express = require('express');
const router = express.Router();

/**
 * contains all the routes that render pages
 */

router.get('/game', (req, res, next) => {
  res.render('gameView', {loggedIn: true, username: "Bob"});
});

router.get('/lobby', (req, res, next) => {
  res.render('lobbyView', {});
})

module.exports = router;