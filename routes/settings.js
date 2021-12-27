const express = require('express');
const settings = require('../controllers/settings')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.get('/', isLoggedIn, inGroup, settings.renderSettings)

module.exports = router;