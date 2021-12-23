const express = require('express');
const group = require('../controllers/group')
const {isLoggedIn} = require('../middleware')
const router = express.Router();

router.get('/', isLoggedIn, group.renderForm);

router.post('/create', isLoggedIn, group.createGroup);

router.post('/join', isLoggedIn, group.joinGroup);

module.exports = router;