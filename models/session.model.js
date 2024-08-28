const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SereneUser',
        required: true
    },
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professional',
        required: true
    },
    sessionType: {
        type: String,
        enum: ['call', 'counseling', 'consultation', 'assessment'],
        default: 'call',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

SessionSchema.pre('save', function (next) {
    if (typeof this.date === 'string') {
        this.date = new Date(this.date);
    }
    next();
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
