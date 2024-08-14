const express = require('express');
const router = express.Router();

const community = require('../controllers/community.controller');


// Creating a community
router.post('/create', community.create);

// Searching for a community
// router.get('/:param');

// Joining a community
router.post('/join', community.join);


// Posting in a community
router.post('/message', community.post);

// Leaving a community
router.post('/leave', community.leave);


// Deleting a community
router.delete('/delete/:id', community.delete);


module.exports = router;