const Joi = require('joi');

const createCommunitySchemaValidation = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    description: Joi.string().required(),
    rules: Joi.array().items(Joi.string()).allow(null),
    topics: Joi.array().items(Joi.string()).allow(null, '')
});

const loginSchemaValidation = Joi.object({
    walletid: Joi.string().required()
});

module.exports = { createCommunitySchemaValidation };
