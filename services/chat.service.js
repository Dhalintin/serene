const Chat = require('../models/chat.model');
const ChatUtil = require('../utils/chat.util');

class ChatService {
    async store(senderId, recieverId, roomId, message) {
        const time = await ChatUtil.formatTimestamp(Date.now());
        const newMessage = new Chat({ senderId, recieverId, roomId, message, time });
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
}

module.exports = new ChatService();
