const express = require('express');
const auth = require('../controllers/auth')
const {isLoggedIn} = require('../middleware')
const router = express.Router();

router.route('/login')
    .get(isLoggedIn, auth.redirectHome)
    .post(auth.login);

router.route('/register')
    .get(isLoggedIn, auth.redirectHome)
    .post(auth.register);

router.get('/logout', auth.logout)

router.get('/auth', isLoggedIn, auth.redirectHome)

module.exports = router;