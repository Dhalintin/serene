const Joi = require('joi');

const signupSchemaValidation = Joi.object({
    walletid: Joi.string().required(),
    username: Joi.string().min(3).required(),
});

const loginSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)

});

module.exports = {signupSchemaValidation, loginSchemaValidation};
