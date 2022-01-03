const express = require('express');
const dashboard = require('../controllers/dashboard')
const {isLoggedIn, inGroup} = require('../middleware')
const router = express.Router();

router.route('/').get(isLoggedIn, inGroup, dashboard.renderDashboard);

router.route('/add')
    .get(isLoggedIn, inGroup, dashboard.renderChoreForm)
    .post(isLoggedIn, inGroup, dashboard.addChore);

router.post('/claim', isLoggedIn, inGroup, dashboard.claimChore);

router.post('/finish', isLoggedIn, inGroup, dashboard.finishChore);

router.delete('/delete', isLoggedIn, inGroup, dashboard.deleteChore);

module.exports = router;