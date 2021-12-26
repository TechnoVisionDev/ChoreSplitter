const express = require('express');
const leaderboard = require('../controllers/leaderboard')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.get('/', isLoggedIn, inGroup, leaderboard.renderLeaderboard);

module.exports = router;