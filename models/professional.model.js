const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Therapist', 'Counselor', 'Psychologist', 'Psychiatrist', 'Clinical Psychologist', 'Counseling Psychologist', 'Licensed Professional Counselor', 'Marriage and Family Therapist', 'Psychotherapist', 'Addiction Counselor', 'School Psychologist', 'Psychoanalyst', 'Child and Adolescent Psychologist', 'Occupational Therapist', 'Rehabilitation Counselor', 'Behavioral Therapist', 'Neuropsychologist', 'Forensic Psychologist'],
        required: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }],
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
});

const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;
