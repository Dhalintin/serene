const express = require('express');
const router = express.Router();

const controller = require('../controllers/professional.controller');

// Register a professional
router.post('/create', controller.create);

// Log Professional in
router.post('/login', controller.login);

// View all professional
router.get('/', controller.viewall);

// View all professionals in a category
router.get('/category', controller.viewByCat);

// Edit a professional's profile
router.patch('/:id', controller.edit);

// View a professional
router.get('/:id', controller.view);

// View all professional by a specific criteria
router.get('/sort/:order', controller.field);

// Remove a professional
router.delete('/delete/:id', controller.delete);

module.exports = router;
