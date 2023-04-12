const Article = require('../models/Article.model');
const Intro = require('../models/Intro.model');

const homeController = {
    getHomeData: async (req, res) => {
        const homeIntro = await Intro.findAll();
        const recentArticles = await Article.findAll({
            where: { is_public: true },
            order: [
                ['sort_order', 'ASC'],
                ['id', 'DESC'],
            ],
            limit: 3,
        });
        res.json({ home_intro: homeIntro, recent_articles: recentArticles });
    },
};

module.exports = homeController;
