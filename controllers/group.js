const ShortUniqueId = require('short-unique-id');
const User = require('../models/user');
const Group = require('../models/group');
const catchAsync = require('../utils/catchAsync');

// Render group form
module.exports.renderForm = (req, res) => {
    if (!req.session.group) {
        return res.render('group');
    }
    // User is already in a group
    res.redirect('dashboard');
};

// Create a new group
module.exports.createGroup = catchAsync(async (req, res) => {
    const email = req.session.email;
    const code = new ShortUniqueId({length: 10})();
    const group = new Group({ group: code });
    await group.save(); 
    await User.updateOne({email}, {group: code});
    req.session.group = code;
    res.redirect('/dashboard');
});

// Join an existing group using unique 6-letter code
module.exports.joinGroup = catchAsync(async (req, res) => {
    const { code } = req.body;
    const groupError = '*You must enter a valid group code.';
    if (code.length < 10) {
        return res.render('group', {groupError});
    }

    const group = await Group.findOne({group: code}).lean();
    if (group) { 
        const email = req.session.email;
        await User.updateOne({email}, {group: code});
        req.session.group = code;
        return res.redirect('/dashboard');
    }
    res.render('group', {groupError});
});