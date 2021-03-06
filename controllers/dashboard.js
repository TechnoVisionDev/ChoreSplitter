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

    const avatars = [];
    const data = doc.chores;
    for (let chore of data) {
        const claim = chore.claimed;
        if (claim && !(claim in avatars)) {
            const claimDoc = await User.findOne({email: claim}).lean();
            avatars[claim] = claimDoc.avatar;
        }
    }
    res.render('dashboard', {data, avatar, group, name: user.name, points: user.points, avatars, email});
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

// Claims a chore as 'in-progress' with user's email
module.exports.claimChore = async (req, res) => {
    try { 
        const {index} = req.body;
        const {email, group} = req.session;
        const update = { '$set': {} };
        update['$set'][`chores.${index}.claimed`] = email;
        await Group.updateOne({group}, update);
    } catch (e) {console.log(e)}
    res.redirect('/dashboard');
};

// Finishes a claimed chore to win points
module.exports.finishChore = async (req, res) => {
    try {
        const {index} = req.body;
        const {email, group} = req.session;
        const award = (await Group.findOne({group}).lean()).chores[index].points;
        await User.updateOne({email}, {$inc: {points: award}});
        return module.exports.deleteChore(req, res);
    } catch (e) {console.log(e)}
    res.redirect('/dashboard');
};

// Deletes a chore from the group dashboard
module.exports.deleteChore = async (req, res) => {
    try {
        const {index} = req.body;
        const group = req.session.group;
        const unset = { '$unset': {} };
        unset['$unset'][`chores.${index}`] = 1;
        await Group.updateOne({group}, unset) 
        await Group.updateOne({group}, {$pull : {"chores" : null}})
    } catch (e) {console.log(e)}
    res.redirect('/dashboard');
};