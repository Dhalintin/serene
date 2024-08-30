const express = require('express');
const router = express.Router();

const chat = require('../controllers/chat.controller');

// Saving a chat message
router.post('/create', chat.createRoom);

// Saving a chat message
router.post('/getchat', chat.getRoomAndMessages);

// Saving a chat message
router.post('/store', chat.store);

// Getting all messages for a user
router.get('/messages', chat.getMessages);

// Getting all the messages on a chat
router.get('/message/:roomid', chat.getChatMessage);

router.delete('/clearchat/:roomId', chat.clearChatMessages);

module.exports = router;
