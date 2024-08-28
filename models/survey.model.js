const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SereneUser',
        required: true
    },
    response: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            answer: [
                {
                    type: String,
                    required: true,
                    trim: true
                }
            ]
        }
    ],
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
