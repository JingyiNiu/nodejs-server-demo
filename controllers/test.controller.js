const Article = require('../models/article.model');

const testController = {
    getArticles: async (req, res) => {
        const articles = await Article.findAll({
            where: {
                is_public: true,
            },
            order: [
                ['sort_order', 'ASC'],
                ['id', 'DESC'],
            ],
        });
        res.json({ data: articles });
    },
};

module.exports = testController;
