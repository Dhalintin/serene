const Community = require('../models/community.model');
const UserCommunity = require('../models/usercommunities.model');
const Message = require('../models/messages.model');

class CommunityService {
    // Gettin all communties
    async getAllCommunties() {
        const communities = await Community.find({});
        return communities;
    }

    async getCommunity(communityId) {
        const community = await Community.findById(communityId);
        return community;
    }

    async countMembers(communityId) {
        const users = await UserCommunity.find({ communityId });
        return users.length;
    }

    // Finding a community by name
    async findCommunity(name) {
        const existingCommunity = await Community.findOne({ name });
        return existingCommunity;
    }

    // Finding a community by Id
    async findCommunityById(id) {
        const existingCommunity = await Community.findOne({ _id: id });
        return existingCommunity;
    }

    // Creating a new community
    async create(name, description, rules, topics, profpic, coverpic) {
        const community = new Community({ name, description, rules, topics, profpic, coverpic });
        await community.save();
        return community;
    }

    // Finding users in a community
    async findUserCommunity(communityId, userId) {
        const userCommunity = await UserCommunity.findOne({ communityId, userId });
        return userCommunity;
    }

    // Joining a community
    async joinCommunity(communityId, userId) {
        const newUerCommunity = new UserCommunity({ communityId, userId });
        const savedUser = await newUerCommunity.save();
        if (savedUser) await Community.findOneAndUpdate({ _id: communityId }, { $inc: { members: 1 } });
        return newUerCommunity;
    }

    // Leaving a community
    async leaveCommunity(id, communityId) {
        const userCommunity = await UserCommunity.findOneAndDelete({ _id: id });
        if (userCommunity) await Community.findOneAndUpdate({ _id: communityId }, { $inc: { members: -1 } });
        return userCommunity;
    }

    // Deleting a community
    async deleteCommunity(id) {
        const userCommunity = await Community.findOneAndDelete({ _id: id });
        return userCommunity;
    }

    // Sending a message/post in a community
    async postMessage(communityId, userId, message) {
        const newMsg = new Message({ communityId, userId, message, time: Date.now() });
        newMsg.save();
        return newMsg;
    }

    // Getting all the Posts in a community
    async posts(communityId) {
        const posts = await Message.find({ communityId }).populate('userId', '-walletid -type -category -createdAt -updatedAt -createdat -__v').exec();
        return posts;
    }

    // Getting a specific post
    async getPostById(id) {
        const post = await Message.findById(id);
        return post;
    }

    // Getting User communities
    async getUserCommunity(userId) {
        const userCommunities = await UserCommunity.find({ userId });
        return userCommunities;
    }

    // Deleting a post
    async deletePost(id) {
        const deletedPost = await Message.findOneAndDelete({ _id: id });
        return deletedPost;
    }
}

module.exports = new CommunityService();
