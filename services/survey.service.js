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
        const newSurvey = new Survey({ userId, response });
        await newSurvey.save();
        return newSurvey;
    }

    async addCat(userId, response, allCat) {
        const category = await SurveyUtil.getCategory(response[0].answer, allCat);
        const newCategory = new UserCategory({ userId, category });
        await newCategory.save();
        return newCategory;
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
