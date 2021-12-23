const express = require('express');
const dashboard = require('../controllers/dashboard')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.route('/').get(isLoggedIn, inGroup, dashboard.renderDashboard);

router.route('/add')
    .get(isLoggedIn, inGroup, dashboard.renderChoreForm)
    .post(isLoggedIn, inGroup, dashboard.addChore);

module.exports = router;