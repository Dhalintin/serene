const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professional',
        required: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    }
});

const Chat = mongoose.model('ChatMessage', chatSchema);

module.exports = Chat;
