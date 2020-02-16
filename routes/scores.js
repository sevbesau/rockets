const express = require('express');
const router = express.Router();
const { getUserData } = require('../bin/util');

// render the spacewars leaderboard
router.get('/leaderboards/spacewars', (req, res) => {
  res.render('leaderboard', { 
    game: "spacewars", 
    ...getUserData(req)
  })
})

// render the snake leaderboard
router.get('/leaderboards/snake', (req, res) => {
  res.render('leaderboard', { 
    game: "snake",
    ...getUserData(req)
  })
})

module.exports = router;