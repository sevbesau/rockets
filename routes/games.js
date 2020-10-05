const express = require('express');

const router = express.Router();
const { getUserData } = require('../bin/util');
const { getScoreByUserId, updateScore, getHighScore, createScore, getGames } = require('../models/database');

/**
 * contains all the routes for the game related pages
 */
router.get('/:game', async (req, res) => {
  const { game } = req.params;
  res.render(game, { ...getUserData(req), highScore: await getHighScore(game) });
})

router.post('/:game', async (req, res) => {
  const game = req.params.game;
  if (req.user) {
    const userId = req.user._id;
    const score = await getScoreByUserId(game, userId);
    if (score) {
      if (score.points < req.body.points) {
        await updateScore(game, userId, req.body.points);
        res.render(game, { 
          ...getUserData(req),
          highScore: { 
            ...await getHighScore(game),
            new: true 
          }
        });
      } 
    } else {
      await createScore(req.body.points, userId, game);
    }
  } 
  res.json('success');
  // TODO ask user to log in when new highscore
})

module.exports = router;
