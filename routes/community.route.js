const express = require('express');
const router = express.Router();

const community = require('../controllers/community.controller');
const communityValidation = require('../middlewares/createcommunity.middleware');


// Creating a community
router.post('/create', communityValidation, community.create);

// Joining a community
router.post('/join', community.join);


// Posting in a community
router.post('/message', community.post);

// Leaving a community
router.post('/leave', community.leave);


// Deleting a community
router.delete('/delete/:id', community.delete);


module.exports = router;