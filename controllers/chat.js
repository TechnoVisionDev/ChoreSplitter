const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

// Render group chat page
module.exports.renderPage = catchAsync(async (req, res) => {
    const {name, avatar} = await User.findOne({email: req.session.email}).lean();
    res.render('chat', {name, avatar});
});