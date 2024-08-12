const Joi = require('joi');

const signupSchemaValidation = Joi.object({
    walletid: Joi.string().required(),
    username: Joi.string().min(3).required(),
});

const loginSchemaValidation = Joi.object({
    walletid: Joi.string().required()
});

module.exports = {signupSchemaValidation, loginSchemaValidation};
