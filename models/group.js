const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    chores: [Object]
});

module.exports = mongoose.model('Group', groupSchema);