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

module.exports = mongoose.model('Group', groupSchema);