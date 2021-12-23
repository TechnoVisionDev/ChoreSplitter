const bcrypt = require('bcrypt');
const User = require('../models/user');

// Redirects to the homepage
module.exports.redirectHome = (req, res) => {
    res.redirect('/');
};

module.exports.register = async (req, res) => {
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

module.exports.logout = (req, res) => {
    req.session.email = null;
    req.session.group = null;
    res.redirect('/');
}