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
        default: 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg'
    },
    group: {
        type: String,
        unique: true,
        index: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;