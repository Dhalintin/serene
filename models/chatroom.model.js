const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SereneUser',
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
