const mongoose = require('mongoose');

const userCategorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SereneUser',
        required: true
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserCategory = mongoose.model('UserCategory', userCategorySchema);

module.exports = UserCategory;
