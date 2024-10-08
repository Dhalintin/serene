const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const communityRoute = require('./community.route');
const profRoute = require('./professionals.route');
const category_route = require('./category.route');
const video_route = require('./video.route');
const sessionRoute = require('./session.route');
const article_route = require('./article.route');
const surveyRoute = require('./survey.route');
const chatRoute = require('./chat.route');
const commentRoute = require('./comment.route');

// User Route
router.use('/user', userRoute);

// Community Route
router.use('/community', communityRoute);

// Community Route
router.use('/comment', commentRoute);

// Professionals' Route
router.use('/professional', profRoute);

// Category Route
router.use('/category', category_route);

// Video Route
router.use('/video', video_route);

// Session Route
router.use('/session', sessionRoute);

// Articles Route
router.use('/article', article_route);

// Survey Route
router.use('/survey', surveyRoute);

// Chat Route
router.use('/chat', chatRoute);

module.exports = router;
