const CommunityService = require('../services/community.service');
const User = require('../services/user.service');


class CommunityController{

    // Creating a new community
    async create(req, res){
        try{
            const { name, description, rules, topics } = req.body;

            const existingCommunity = await CommunityService.findCommunity(name);
            console.log(existingCommunity)

            if(existingCommunity){
                return res.status(400).json({
                    success: false,
                    message: "Community already exists!"
                })
            }

            const newCommunity = CommunityService.create(name, description, rules, topics);

            return res.status(200).json({
                success: true,
                message: "Community created successfully!",
                data: newCommunity
            })

            
        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
        
    }

    async join(req, res){
        try{
            const { communityId, userId } = req.body;

            const community = await CommunityService.findCommunityById(communityId);
            const user = await User.getUserById(userId);

            if(!community || !user){
                return res.status(400).json({
                    success: false,
                    message: "User or Community doesn't exists!"
                })
            }

            const existingUserCom = await CommunityService.findUserCommunity(communityId, userId);
            console.log(existingUserCom)

            if(existingUserCom){
                return res.status(400).json({
                    success: false,
                    message: `You already belong ${community.name}`
                })
            }

            const newUser = await CommunityService.joinCommunity(communityId, userId);

            return res.status(200).json({
                success: true,
                message: `You are now a member ${community.name}`,
                data: newUser
            })


        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async post(req, res){
        try{
            const { userId, communityId, message, time } = req.body;

            const community = await CommunityService.findCommunityById(communityId);
            const user = await User.getUserById(userId);



            if(!community || !user){
                return res.status(400).json({
                    success: false,
                    message: "Message failed to send!"
                })
            }

            const newMessage = await CommunityService.postMessage(communityId, userId, message);

            return res.status(200).json({
                success: true,
                message: "Community created successfully!",
                data: newMessage
            })


        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async leave(req, res){
        try{
            const { communityId, userId } = req.body;

            const community = await Community.findCommunityById(communityId);
            const user = await User.getUser(userId);


            if(!community || !user){
                return res.status(400).json({
                    success: false,
                    message: "User or Community doesn't exists!"
                })
            }

            const existingUserCom = CommunityService.findUserCommunity(communityId, userId);

            if(!existingUserCom){
                return res.status(400).json({
                    success: false,
                    message: "You don't belong to this community"
                })
            }

            await CommunityService.leaveCommunity(existingUserCom._id);

            return res.status(200).json({
                success: true,
                message: "You left the community",
            })


        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;

            const existingCommunity = CommunityService.deleteCommunity(id);

            if(!existingCommunity){
                return res.status(400).json({
                    success: false,
                    message: "Community doesn't exists!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Community deleted successfully!"
            })

            
        }catch(error){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }

        
    }



    
}

module.exports = new CommunityController();