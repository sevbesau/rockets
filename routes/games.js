const express = require('express');

const router = express.Router();
const { getUserData } = require('../bin/util');
const { getScoreByUserId, updateScore, getHighScore, createScore } = require('../models/database');

/**
 * Middelware to check if a user is logged in,
 * if there is noone logged in, redirect to login page
 * @param {*} req
 * @param {*} res
 * @param {*} next
function checkAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    // TODO add flash message
    res.redirect('/users/login');
  }

  return next();
}
*/

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
  // TODO ask user to log in when new highscore
})

module.exports = router;
