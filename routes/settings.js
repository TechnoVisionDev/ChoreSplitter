const express = require('express');
const settings = require('../controllers/settings')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.route('/')
    .get(isLoggedIn, inGroup, settings.renderSettings)
    .patch(isLoggedIn, settings.save)
    .delete(isLoggedIn, inGroup, settings.leaveGroup)

module.exports = router;