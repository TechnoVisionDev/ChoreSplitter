const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    chores: [String]
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;