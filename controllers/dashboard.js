const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Group = require('../models/group');

// Render dashboard page
module.exports.renderDashboard = catchAsync(async (req, res) => {
    const email = req.session.email;
    const user = await User.findOne({email}).lean();
    if (!user) throw new Error('ERROR: Unable to find user in database.');

    const avatar = user.avatar || 'https://i.stack.imgur.com/34AD2.jpg';
    const group = req.session.group;
    const doc = await Group.findOne({group});
    res.render('dashboard', {data: doc.chores, avatar, group, name: user.name, points: user.points});
});

// Render add chore form
module.exports.renderChoreForm = (req, res) => {
    res.render('dashboard/add');
};

// Create a new chore and add it to the dashboard
module.exports.addChore = async (req, res) => {
    try {
        // Form validation
        let {name, description, points} = req.body;
        points = parseInt(points);
        if (!name || !description || name.trim() === '' || description.trim() === '' ) throw new Error();
        if (!points || points < 1 || points > 100) throw new Error();
        const chore = {name: name.trim(), description: description.trim(), points};

        // Add chore to database
        const group = req.session.group;
        await Group.updateOne({group}, {$push: {chores: chore}});
        res.redirect('/dashboard');
    } catch (e) {
        res.render('dashboard/add', {choreError: true});
    }
};