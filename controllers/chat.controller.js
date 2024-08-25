const UserService = require('../services/user.service');
const ProfService = require('../services/professional.service');
const ChatService = require('../services/chat.service');

class ChatController {
    async store(req, res) {
        const { senderId, recieverId, roomId, message } = req.body;

        try {
            const existingUser = await UserService.getUserByMultipleId(senderId, recieverId);
            const existingProf = await ProfService.getUserByMultipleId(senderId, recieverId);

            if (!existingUser || !existingProf) {
                return res.status(401).json({
                    success: false,
                    message: "User doesn't exist!"
                });
            }

            const newMessage = await ChatService.store(senderId, recieverId, roomId, message);

            return res.status(200).json({
                success: true,
                message: 'Message sent!',
                data: newMessage
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getMessages(req, res) {
        const roomId = req.body.roomId;

        try {
            const messages = await ChatService.getChatMessage(roomId);

            if (!messages) {
                return res.status(401).json({
                    success: false,
                    message: "Chat doesn't exist!"
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: messages
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getChatMessage(req, res) {
        const roomId = req.params.roomid;

        try {
            const chatMessage = await ChatService.getChatMessage(roomId);

            if (!existingRoom) {
                return res.status(401).json({
                    success: false,
                    message: "Chat doesn't exist!"
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: chatMessage
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new ChatController();
