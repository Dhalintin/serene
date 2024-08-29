const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rules: [
        {
            type: String
        }
    ],
    topics: [
        {
            type: String
        }
    ],
    profpic: {
        type: String,
        required: true
    },
    coverpic: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
