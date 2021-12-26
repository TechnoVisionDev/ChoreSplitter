const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://i.stack.imgur.com/34AD2.jpg'
    },
    group: {
        type: String,
        unique: true,
        index: true
    }
});

module.exports = mongoose.model('User', userSchema);