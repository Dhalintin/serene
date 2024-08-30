const User = require('../models/user.model');

class UserService {
    async getUser(walletid) {
        const existingUser = await User.findOne({ walletid });
        return existingUser;
    }

    async checkUser(userId1, userId2) {
        const existingUser1 = await User.findById(userId1);
        const existingUser2 = await User.findById(userId2);
        if (!existingUser2 && !existingUser1) return false;
        return true;
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
