
// Checks if user is authenticated
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.email) {
        return res.render('auth');
    }
    next();
}

// Checks if user is in a group
module.exports.inGroup = (req, res, next) => {
    if (!req.session.group) {
        return res.redirect('group');
    }
    next();
}