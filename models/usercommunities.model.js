const mongoose = require('mongoose');

const userCommunitiesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SereneUser',
        required: true
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserCommunities = mongoose.model('UserCommunity', userCommunitiesSchema);

module.exports = UserCommunities;
