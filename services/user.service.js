const User = require('../models/user.model');

class UserService {
    async getUser(walletid, username = null){
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { walletid: walletid }
            ]
        });
        return existingUser
    }


    async addUser (walletid, username){
        const user = new User({ walletid, username });
        return await user;
    }


    async allUsers(){
        const users = User.find({});
        return users;
    }

    async getUserById(userId){
        const user = User.findOne({ _id: userId});
        return user;
    }
}

module.exports = new UserService()