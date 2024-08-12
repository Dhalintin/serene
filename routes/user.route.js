const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const signupValidation = require('../middlewares/signup.middleware');
const loginValidation = require('../middlewares/login.middleware');


router.post('/signup', signupValidation, controller.signup);

router.post('/login', loginValidation, controller.login);

router.get('/', controller);

router.get('/:id', ()=>{
    console.log("Here's user 5");
});

router.put('/:id', ()=>{
    console.log('Profile update!');
});

router.delete('/:id', ()=>{
    console.log('User deleted!');
});


module.exports = router;