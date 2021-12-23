const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to require login
const requireLogin = (req, res, next) => {
    if (!req.session.email) {
        return res.render('login');
    }
    next();
}

// Login and register page redirect
router.get('/auth', requireLogin, (req, res) => {
    res.redirect('/');
})

// Register authentication
router.post('/register', async (req, res) => {
    try {
        // Form validation
        const {email, password, verify, name, avatar, terms} = req.body;
        if (!email || !name || !password || !verify || !terms) {
            throw new Error('*You must fill out all fields to register.');
        }
        if (password !== verify) {
            throw new Error('*The passwords you entered do not match.');
        }

        // Create new user document
        const user = new User({ email : email, password : password, name : name, avatar : avatar});
        try { await user.save() }
        catch (e) { throw new Error('*That email address is already in use.'); }

        // Create session and redirect
        req.session.email = email;
        res.redirect('/');
    } catch (e) {
        res.render('login', {registerError: e.message});
    }
})

// Login authentication
router.post('/login', async (req, res) => {
    try {
        // Form validation
        const {email, password} = req.body;
        if (!email || !password) {
            throw new Error('*You must fill out all fields to login.');
        }

        // Verify user with database
        const user = await User.findOne({email : email, password : password}).lean();
        if (!user) { throw new Error('*Invalid email and password.'); }

        // Create session and redirect
        req.session.email = email;
        res.redirect('/');
    } catch (e) {
        res.render('login', {loginError: e.message});
    }
})

// Logout and remove session
router.get('/logout', (req, res) => {
    req.session.email = null;
    res.redirect('/');
})

module.exports = { router, requireLogin };