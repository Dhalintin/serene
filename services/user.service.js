const User = require('../models/user.model');

class UserService {
    async getUser(walletid) {
        const existingUser = await User.findOne({ walletid });
        return existingUser;
    }

    async addUser(walletid, username, avatar) {
        const user = new User({ walletid, username, avatar });
        user.save();
        return await user;
    }

    async allUsers() {
        const users = await User.find({});
        return users;
    }

    async getUserById(userId) {
        const user = User.findOne({ _id: userId });
        return user;
    }

    async getUserByMultipleId(senderId, recieverId) {
        const user = User.find({
            $or: [{ _id: senderId }, { _id: recieverId }]
        });
        return user;
    }
}

module.exports = new UserService();
