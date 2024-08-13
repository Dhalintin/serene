const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const userValidation = require('../middlewares/user.middleware');


router.post('/login', userValidation, controller.login);



module.exports = router;