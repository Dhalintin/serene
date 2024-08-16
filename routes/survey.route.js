const express = require('express');
const router = express.Router();

const controller = require('../controllers/survey.controller');

// Store a survey response
router.post('/save', controller.storeResponse);

// Getting a survey response
router.get('/response', controller.getResponse);

// Getting survey questions
router.get('/', controller.getQuestion);

// Store survey questions
router.post('/', controller.storeQuestion);

module.exports = router;
