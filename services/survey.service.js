const Survey = require('../models/survey.model');
const Question = require('../models/question.model');
const SurveyUtil = require('../utils/survey.util');
const UserCategory = require('../models/usercategory.model');

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

    async store(userId, response, allCat) {
        const responses = await SurveyUtil.findQuestion(response);
        const category = await SurveyUtil.getCategory(responses.answer, allCat);
        const newSurvey = new Survey({ userId, response, category });
        await newSurvey.save();
        return newSurvey;
    }

    async getRes(userId) {
        const surveyResponse = await Survey.findOne({ userId });
        return surveyResponse;
    }

    async getUserCat(userId) {
        const userCat = await UserCategory.find({ userId });
        return userCat;
    }
}

module.exports = new SurveyService();
