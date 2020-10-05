const express = require('express');

const router = express.Router();
const { getMessages, addMessage } = require('../models/database');

router.get('/', async (req, res) => {
  res.json(await getMessages());
});

router.post('/', async (req, res) => {
  // TODO validation
  await addMessage(req.body);
  res.redirect('/');
});

module.exports = router;
