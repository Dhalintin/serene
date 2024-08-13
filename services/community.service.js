const Community = require('../models/community.model');
const UserCommunity = require('../models/usercommunities.model');
const Message = require('../models/messages.model');

class CommunityService {
    // Finding a community by name
    async findCommunity(name){
        const existingCommunity = await Community.findOne({ name });
        return existingCommunity
    }

    // Finding a community by Id
    async findCommunityById(id){
        const existingCommunity = await Community.findOne({ _id: id});
        return existingCommunity
    }

    // Creating a new community
    async create(name, description, rules, topics){
        const community = new Community({ name, description, rules, topics });
        await community.save();
        return community;
    }


    // Finding users in a community
    async findUserCommunity(communityId, userId){
        const userCommunity = await UserCommunity.findOne({ communityId, userId })
        return userCommunity;
    }

    // Joining a community
    async joinCommunity(communityId, userId){
        const newUerCommunity = new UserCommunity({ communityId, userId });
        newUerCommunity.save()
        return await newUerCommunity;
    }

    // Leaving a community
    async leaveCommunity(id){
        const userCommunity = await UserCommunity.findOneAndDelete({ _id: id });
        return userCommunity;
    }

    // Deleting a community
    async deleteCommunity(id){
        const userCommunity = await Community.findOneAndDelete({ _id: id });
        return userCommunity;
    }

    // Sending a message/post in a community
    async postMessage(communityId, userId, message){
        const newMsg = new Message({ communityId, userId, message, time: Date.now() });
        newMsg.save()
        return newMsg;
    }
}

module.exports = new CommunityService()