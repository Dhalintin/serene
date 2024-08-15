const express = require('express');
const router = express.Router();

const controller = require('../controllers/session.controller');

// Create a  new session
router.post('/create', controller.create);

// View all sessions
router.get('/', controller.viewall);

// View a session
router.get('/:id', controller.view);

// Confirm a session
router.patch('/confirm/:id', controller.confirm);

// Update a Session
router.patch('/:id', controller.update);

// Complete a session
router.patch('/done/:id', controller.complete);

// Cancel a session
router.patch('/cancel/:id', controller.cancel);

// Delete a session
router.delete('/delete/:id', controller.delete);

// Professionals getting all their sessions
router.get('/apointments/:id', controller.appointment);

module.exports = router;
