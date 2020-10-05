const express = require('express');

const router = express.Router();
const { getScoresByGameName } = require('../models/database');
const { getUserData } = require('../bin/util');

router.get('/leaderboards/:game', async (req, res) => {
  res.render('leaderboard', {
    ...getUserData(req),
    game: req.params.game,
    scores: await getScoresByGameName(req.params.game),
  });
});

/*
// render the spacewars leaderboard
router.get('/leaderboards/spacewars', (req, res) => {
  res.render('leaderboard', {
    game: 'spacewars',
    ...getUserData(req),
  });
});

// render the snake leaderboard
router.get('/leaderboards/snake', (req, res) => {
  res.render('leaderboard', {
    game: 'snake',
    ...getUserData(req),
  });
});
*/

module.exports = router;
