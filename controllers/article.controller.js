const { Sequelize } = require('sequelize');
const Article = require('../models/Article.model');
const Tag = require('../models/Tag.model');

const articleController = {
    getAllArticles: async (req, res) => {
        const articles = await Article.findAll({
            where: {
                is_public: 1,
            },
            order: [
                ['sort_order', 'ASC'],
                ['id', 'DESC'],
            ],
            include: {
                model: Tag,
                through: { attributes: [] },
            },
        });
        const tags = await Tag.findAll();
        res.json({ articles: articles, tags: tags });
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        await Article.increment('view_count', {
            where: { [Sequelize.Op.or]: [{ id }, { slug: id }] },
        });

        const article = await Article.findOne({
            where: { [Sequelize.Op.or]: [{ id }, { slug: id }], is_public: true },
            include: {
                model: Tag,
                through: { attributes: [] },
            },
        });
        res.json(article);
    },
};

module.exports = articleController;
