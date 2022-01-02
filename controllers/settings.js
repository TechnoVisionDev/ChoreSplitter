const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Group = require('../models/group');
const {isImage} = require('./auth');

// Render dashboard page
module.exports.renderSettings = (req, res) => {
    res.render('settings');
};

// Saves modified settings for user
module.exports.save = catchAsync(async (req, res) => {
    const email = req.session.email;
    const {avatar, name} = req.body;
    let settingsError = null;
    if (avatar) {
        if (await isImage(avatar)) {
            await User.updateOne({email}, {$set: {avatar}})
        } else {
            settingsError = '*The specified avatar is invalid!';
        }
    }

    if (name && name.trim() !== '') {
        await User.updateOne({email}, {$set: {name: name.trim()}})
    }
    
    if (settingsError) {
        return res.render('settings', {settingsError});
    }
    return res.redirect('dashboard');
});

// Removes user from group and unclaims all chores
module.exports.leaveGroup = catchAsync(async (req, res) => {
    const group = req.session.group;
    const email = req.session.email;
    await Group.updateOne({group, 'chores.claimed': email}, {$unset: {'chores.$.claimed': 1}})
    await User.updateOne({email}, {$unset: {group: 1}, $set: {points: 0}});
    delete req.session.group;
    res.redirect('/');
});