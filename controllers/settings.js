const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Group = require('../models/group');

// Render dashboard page
module.exports.renderSettings = (req, res) => {
    res.render('settings');
};

// Saves modified settings for user
module.exports.save = (req, res) => {
    //TODO: save form fields to mongodb
    res.redirect('dashboard');
};

// Removes user from group and unclaims all chores
module.exports.leaveGroup = (req, res) => {
    //TODO: remove user from group in mongodb
    res.redirect('/');
};