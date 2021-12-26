const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

// Render leaderboard page
module.exports.renderLeaderboard = catchAsync(async(req, res) => {
    const group = req.session.group;
    let data = await User.find({group}).sort({points: -1});
    let shame = data[data.length-1];
    res.render('leaderboard', {data, shame});
});