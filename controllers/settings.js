const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Group = require('../models/group');

// Render dashboard page
module.exports.renderSettings = (req, res) => {
    res.render('settings');
};