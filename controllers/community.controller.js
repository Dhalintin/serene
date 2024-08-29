const CommunityService = require('../services/community.service');
const User = require('../services/user.service');

class CommunityController {
    async getCommunities(req, res) {
        try {
            const communities = await CommunityService.getAllCommunties();

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: communities
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getACommunity(req, res) {
        try {
            const communityId = req.params.id;

            const community = await CommunityService.getCommunity(communityId);
            const countMembers = await CommunityService.countMembers(communityId);

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: community,
                numOfMembers: countMembers
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    // Creating a new community
    async create(req, res) {
        try {
            const { name, description, rules, topics } = req.body;

            const existingCommunity = await CommunityService.findCommunity(name);

            if (existingCommunity) {
                return res.status(400).json({
                    success: false,
                    message: 'Community already exists!'
                });
            }

            const newCommunity = await CommunityService.create(name, description, rules, topics);

            return res.status(200).json({
                success: true,
                message: 'Community created successfully!',
                data: newCommunity
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async join(req, res) {
        try {
            const { communityId, userId } = req.body;

            const community = await CommunityService.findCommunityById(communityId);
            const user = await User.getUserById(userId);

            if (!community || !user) {
                return res.status(400).json({
                    success: false,
                    message: "User or Community doesn't exists!"
                });
            }

            const existingUserCom = await CommunityService.findUserCommunity(communityId, userId);

            if (existingUserCom) {
                return res.status(400).json({
                    success: false,
                    message: `You already belong ${community.name}`
                });
            }

            const newUser = await CommunityService.joinCommunity(communityId, userId);

            return res.status(200).json({
                success: true,
                message: `You are now a member of ${community.name}`,
                data: newUser
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async post(req, res) {
        try {
            const { userId, communityId, message } = req.body;

            const community = await CommunityService.findCommunityById(communityId);
            const user = await User.getUserById(userId);

            if (!community || !user) {
                return res.status(400).json({
                    success: false,
                    message: 'Message failed to send!'
                });
            }

            const newPost = await CommunityService.postMessage(communityId, userId, message);

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: newPost
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getposts(req, res) {
        const communityId = req.params.communityid;

        try {
            const community = await CommunityService.findCommunityById(communityId);
            if (!community) {
                return res.status(400).json({
                    success: false,
                    message: "Community doesn't exists!"
                });
            }

            const communityPosts = await CommunityService.posts(communityId);

            return res.status(200).json({
                success: true,
                message: 'Successful',
                data: communityPosts
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getPost(req, res) {
        const id = req.params.id;

        try {
            const post = await CommunityService.getPostById(id);
            if (!post) {
                return res.status(400).json({
                    success: false,
                    message: "Post doesn't exist!"
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful',
                data: post
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async leave(req, res) {
        try {
            const { communityId, userId } = req.body;

            const community = await CommunityService.findCommunityById(communityId);
            const user = await User.getUserById(userId);

            if (!community || !user) {
                return res.status(400).json({
                    success: false,
                    message: "User or Community doesn't exists!"
                });
            }

            const existingUserCom = CommunityService.leaveCommunity(communityId, userId);

            if (!existingUserCom) {
                return res.status(400).json({
                    success: false,
                    message: "You don't belong to this community"
                });
            }

            await CommunityService.leaveCommunity(existingUserCom._id);

            return res.status(200).json({
                success: true,
                message: 'You left the community'
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getUserCommunity(req, res) {
        try {
            const userId = req.params.userid;

            const user = await User.getUserById(userId);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User doesn't exists!"
                });
            }

            const userCom = await CommunityService.getUserCommunity(userId);

            if (!userCom) {
                return res.status(400).json({
                    success: false,
                    message: "You don't belong to any community"
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful',
                data: userCom
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            const existingCommunity = CommunityService.deleteCommunity(id);

            if (!existingCommunity) {
                return res.status(400).json({
                    success: false,
                    message: "Community doesn't exists!"
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Community deleted successfully!'
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new CommunityController();
