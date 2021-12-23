
// Checks if user is authenticated
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.email) {
        return res.render('auth');
    }
    next();
}