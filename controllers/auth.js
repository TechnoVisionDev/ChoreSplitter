const bcrypt = require('bcrypt');
const User = require('../models/user');
const fetch = require('node-fetch');

// Redirects to the homepage
module.exports.redirectHome = (req, res) => {
    res.redirect('/');
};

// Creates a new user account
module.exports.register = async (req, res) => {
    try {
        // Form validation
        let {email, password, verify, name, avatar, terms} = req.body;
        if (!email || !name || !password || !verify || !terms) {
            throw new Error('*You must fill out all fields to register.');
        }
        if (password !== verify) {
            throw new Error('*The passwords you entered do not match.');
        }
        if (!await module.exports.isImage(avatar)) {
            avatar = undefined;
        }

        // Create new user document
        const encryptedPass = await bcrypt.hash(password, 10);
        const user = new User({ email, password: encryptedPass, name, avatar});
        try { await user.save() }
        catch (e) { throw new Error('*That email address is already in use.'); }

        // Create session and redirect
        req.session.email = email;
        res.redirect('group');
    } catch (e) {
        res.render('auth', {registerError: e.message});
    }
}

// Validates a user account
module.exports.login = async (req, res) => {
    try {
        // Form validation
        const {email, password} = req.body;
        if (!email || !password) {
            throw new Error('*You must fill out all fields to login.');
        }

        // Verify user with database
        const user = await User.findOne({email}).lean();
        if (!user) { throw new Error('*Invalid email and password.'); }
        const match = await bcrypt.compare(password, user.password);
        if (!match) { throw new Error('*Invalid email and password.'); }

        // Create session and redirect
        req.session.email = email;
        if (user.group != null) {
            req.session.group = user.group;
            return res.redirect('dashboard');
        }
        res.redirect('group');
    } catch (e) {
        return res.render('auth', {loginError: e.message});
    }
}

// Removes session for user
module.exports.logout = (req, res) => {
    req.session.email = null;
    req.session.group = null;
    res.redirect('/');
}

// Checks if url is a valid image
module.exports.isImage = async (url) => {
    if (!url || url.trim() === '') return false;
    try { 
        const res = await fetch(url);
        const buff = await res.blob();
        return buff.type.startsWith('image/')
    } catch (e) {
        return false;
    }
}