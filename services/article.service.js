const Article = require('../models/article.model')

class ArticleService {

    async get_an_article(article_id) {
        
        const article = Article.findById(article_id)
        return article
    }
}

const article_service = new ArticleService()
module.exports = article_service