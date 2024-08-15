const express = require('express')
const router = express.Router()

const article_controller = require('../controllers/article.controller')

router.route('/:id')
    .get(article_controller.get_an_article)


module.exports = router