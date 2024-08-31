const express = require('express');
const router = express.Router();

const comment = require('../controllers/comment.controller');

// Getting all the commnents in a post
router.get('/post/:id', comment.getComments);

// Getting a commnent
router.get('/:id', comment.getComment);

// Commenting on a post
router.post('/:id', comment.postComment);

// Editing a comment
router.patch('/:id', comment.editComment);

// Deleting a comment
router.delete('/:id', comment.deleteComment);

module.exports = router;
