const Chat = require('../models/chat.model');
const ChatUtil = require('../utils/chat.util');
const ChatRoom = require('../models/chatroom.model');

class ChatService {
    async store(senderId, roomId, message) {
        const time = await ChatUtil.formatTimestamp(Date.now());
        const newMessage = new Chat({ senderId, roomId, message, time });
        console.log(newMessage);
        await newMessage.save();
        return newMessage;
    }

    async getMessage(id) {
        const messages = await Chat.find({
            $or: [{ senderId: id }, { recieverId: id }]
        }).sort({ timestamp: 1 });

        return messages;
    }

    async getChatMessage(roomId) {
        const messages = await Chat.find({ roomId }).sort({ timestamp: 1 });

        return messages;
    }

    async getChatRoom(userId1, userId2) {
        const room = await ChatRoom.findOne({
            members: { $all: [userId1, userId2] },
            $expr: { $eq: [{ $size: '$members' }, 2] }
        })
            .populate('members', '-walletid -updatedAt -createdAt -__v')
            .exec();

        return room;
    }

    async createRoom(userId1, userId2) {
        const members = [userId1, userId2];
        const newRoom = new ChatRoom({ members });
        await newRoom.save();
        const populatedRoom = await ChatRoom.findById(newRoom._id).populate('members', '-walletid -updatedAt -createdAt -__v -type');
        return populatedRoom;
    }

    async getUserChatRoom(userId) {
        const userRooms = await ChatRoom.findOne({ members: userId });
        return userRooms;
    }

    async clearChat(roomId) {
        const result = await Chat.deleteMany({ roomId });

        return result;
    }
}

module.exports = new ChatService();
