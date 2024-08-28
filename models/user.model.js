const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        default: 'patient'
    },
    category: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('SereneUser', userSchema);

module.exports = User;
