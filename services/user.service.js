const User = require('../models/user.model');

class UserService {
    async getUser(walletid, username){
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
}

module.exports = new UserService()