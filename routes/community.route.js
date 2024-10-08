const express = require('express');
const router = express.Router();

const community = require('../controllers/community.controller');
const communityValidation = require('../middlewares/createcommunity.middleware');

// Viewing all communities
router.get('/', community.getCommunities);

// Viewing a community
router.get('/:id', community.getACommunity);

// Creating a community
router.post('/create', communityValidation, community.create);

// Joining a community
router.post('/join', community.join);

// Posting in a community
router.post('/message', community.post);

// Getting post  in a community
router.get('/post/:communityid', community.getposts);

// Viewing all communities posts
router.get('/post/:id', community.getPost);

router.get('/usercommunity/:userid', community.getUserCommunity);

// Leaving a community
router.post('/leave', community.leave);

// Deleting a community
router.delete('/delete/:id', community.delete);

// Deleting a community
router.delete('/post/:id', community.deletepost);

module.exports = router;
