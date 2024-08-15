const article_service = require('../services/article.service')

class ArticleController {

    async get_an_article(req, res) {
        
        const { id } = req.params
        
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
        
       }
    }
}

const article_controller = new ArticleController()
module.exports = article_controller;