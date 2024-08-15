const article_service = require('../services/article.service');
const category_service = require('../services/category.service');
const handleValidationError = require('../utils/validation-error.util');

class ArticleController {
    async get_an_article(req, res) {
        const { id } = req.params;

        try {
            const article = await article_service.get_an_article(id);
            if (!article) {
                return res.status(404).json({
                    status: false,
                    message: 'Article not found'
                });
            }
            return res.status(200).json(article);
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error fetching article',
                name: error.name
            });
        }
    }

    async get_all_articles(req, res) {
        try {
            const articles = await article_service.get_all_articles();
            if (articles.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'No articles found'
                });
            }
            return res.status(200).json({
                status: false,
                data: articles
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error fetching articles',
                name: error.name
            });
        }
    }

    async create_article(req, res) {
        // your code goes here
        const { title, body, author, cat_id } = req.body;

        const cat_id_exists = await category_service.get_category(cat_id);
        if (!cat_id_exists) {
            return res.status(404).json({
                status: false,
                message: `Category with this ID ${cat_id} does not exist`
            });
        }
        try {
            const article = await article_service.create_article(title, body, author, cat_id);
            return res.status(201).json({
                status: true,
                message: 'Article created successfully',
                article
            });
        } catch (e) {
            if (e.name === 'ValidationError') {
                if (handleValidationError(res, e, 'title')) return;
                if (handleValidationError(res, e, 'body')) return;
                if (handleValidationError(res, e, 'author')) return;
                if (handleValidationError(res, e, 'cat_id')) return;
            }

            console.error(e);
            return res.status(500).json({
                status: false,
                message: 'An internal server error occurred'
            });
        }
    }

    async update_article(req, res) {
        const { id } = req.params;
        const { title, body, author } = req.body;

        // Only include fields that are provided
        const data = {};
        if (title !== undefined) data.title = title;
        if (body !== undefined) data.body = body;
        if (author !== undefined) data.author = author;

        // Check if there's any data to update
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                status: false,
                message: 'No data provided for update'
            });
        }

        try {
            const update_article = await article_service.update_article(id, data);

            if (update_article) {
                return res.status(200).json({
                    status: true,
                    message: 'Article updated successfully',
                    data: update_article
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Article not found'
                });
            }
        } catch (error) {
            console.error(error);
            if (error.name === 'CastError') {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid Id format'
                });
            }
            return res.status(500).json({
                status: false,
                message: 'An error occurred while updating the Article',
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }
    }

    async delete_article(req, res) {
        const {id} = req.params

        const id_exists = await article_service.get_an_article(id)
        if (!id_exists) {
            return res.status(404).json({
                status: false,
                message: `Article with Such ID: ${id} does not exist`
            });
        }
        try { 
            const delete_article = await article_service.delete_article(id);
            if (delete_article) { 
                return res.status(200).json({
                    status: true,
                    message: 'Article deleted successfully'
                })
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                status: false,
                message: 'An error occurred while deleting the category'
            });
        }
    }
}

const article_controller = new ArticleController()
module.exports = article_controller;