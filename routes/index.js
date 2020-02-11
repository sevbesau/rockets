const express = require('express');
const router = express.Router();

router.get('/game', (req, res, next) => {
  res.render('gameView', {loggedIn: true, username: "Bob"});
});

router.get('/lobby', (req, res, next) => {
  res.render('lobbyView', {});
})

module.exports = router;