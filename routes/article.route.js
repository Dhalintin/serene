const express = require('express')
const router = express.Router()

const article_controller = require('../controllers/article.controller')

router.route('/:id')
    .get(article_controller.get_an_article)
    .patch(article_controller.update_article)
    .delete(article_controller.delete_article)

router.route('/')
    .get(article_controller.get_all_articles)
    .post(article_controller.create_article)


module.exports = router