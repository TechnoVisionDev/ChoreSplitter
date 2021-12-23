const express = require('express');
const dashboard = require('../controllers/dashboard')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.route('/').get(isLoggedIn, inGroup, dashboard.renderPage);

module.exports = router;