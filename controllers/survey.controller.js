const SurveyService = require('../services/survey.service');
const UserService = require('../services/user.service');

class SurveyController {
    async getQuestion(req, res) {
        try {
            const questions = await SurveyService.getQues();

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: questions
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async storeQuestion(req, res) {
        try {
            const { question, options } = req.body;

            const existingQuestion = await SurveyService.findQuestion(question);

            if (existingQuestion.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Question has already been saved!'
                });
            }

            const newQuest = await SurveyService.storeQuestion(question, options);

            return res.status(200).json({
                success: true,
                message: 'Question stored successfully!',
                data: newQuest
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async storeResponse(req, res) {
        try {
            const { response, userId } = req.body;

            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User does not exist!'
                });
            }

            const survey = await SurveyService.store(userId, response);

            return res.status(200).json({
                success: true,
                message: 'Response store successfully!',
                data: survey
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getResponse(req, res) {
        try {
            const userId = req.body.userId;

            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User does not exist!'
                });
            }

            const survey = await SurveyService.getRes(userId);

            return res.status(200).json({
                success: true,
                message: `Successfull!`,
                data: survey
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new SurveyController();
