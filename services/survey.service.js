const Survey = require('../models/survey.model');
const Question = require('../models/question.model');

class SurveyService {
    async getQues() {
        const questions = await Question.find({});
        return questions;
    }

    async storeQuestion(question, options, type) {
        const newQues = new Question({ question, options, type });
        await newQues.save();
        return newQues;
    }

    async findQuestion(question) {
        const quest = await Question.find({ question });
        return quest;
    }

    async store(userId, data) {
        const newSurvey = new Survey({ userId, data });
        await newSurvey.save();
        return newSurvey;
    }

    async getRes(userId) {
        const surveyResponse = await Survey.findOne({ userId });
        return surveyResponse;
    }
}

module.exports = new SurveyService();
