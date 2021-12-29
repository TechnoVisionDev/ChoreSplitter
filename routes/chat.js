const express = require('express');
const chat = require('../controllers/chat')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.route('/')
    .get(isLoggedIn, inGroup, chat.renderPage)

module.exports = router;