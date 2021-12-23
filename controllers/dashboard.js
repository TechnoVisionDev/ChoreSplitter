const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

// Render dashboard page
module.exports.renderPage = catchAsync(async (req, res) => {
    const email = req.session.email;
    const user = await User.findOne({email}).lean();
    if (!user) throw new Error('ERROR: Unable to find user in database.');

    const avatar = user.avatar || 'https://i.stack.imgur.com/34AD2.jpg';
    const group = req.session.group;
    res.render('dashboard', {avatar, group, name: user.name, points: user.points});
});