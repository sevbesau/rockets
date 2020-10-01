const express = require('express');

const router = express.Router();
const { getUserData } = require('../bin/util');

// render the homepage
router.get('/', (req, res) => {
  res.render('home', getUserData(req));
});

module.exports = router;
