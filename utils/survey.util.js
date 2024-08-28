class SurveyUtil {
    async getCategory(response, allCat) {
        let category = [];
        if (response.includes('I have been feeling depressed')) {
            category.push(allCat[0]._id);
        }
        if (response.includes('I always feel anxious')) {
            category.push(allCat[1]._id);
        }
        if (response.includes('I am struggling with weed addiction')) {
            category.push(allCat[2]._id);
        }

        return category;
    }

    async findQuestion(response) {
        return response.find((item) => item.id === '66bf5042fd8260d6b4bf162b');
    }
}

module.exports = new SurveyUtil();
