const Article = require('../models/article.model')

class ArticleService {
    async get_an_article(article_id) {
        const article = await Article.findById(article_id);
        return article;
    }

    async get_all_articles() {
        const articles = await Article.find();
        return articles;
    }

    async create_article(title, body, author, cat_id) {
        const article = new Article({ title, body, author, cat_id });
        return await article.save();
    }

    async update_article(article_id, updates) {
        const updateObject = {};

        if (updates.title !== undefined) {
            updateObject.title = updates.title;
        }

        if (updates.body !== undefined) {
            updateObject.body = updates.body;
        }

        if (updates.author !== undefined) {
            updateObject.author = updates.author;
        }

        const updatedArticle = await Article.findByIdAndUpdate(article_id, { $set: updateObject }, { new: true });

        return updatedArticle !== null;
    }
}

const article_service = new ArticleService()
module.exports = article_service