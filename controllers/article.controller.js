const connection = require('../config/databse');
const Article = require('../models/Article.model');

const articleController = {
    getAllArticles: async (req, res) => {
        const results = await Article.findAll({
            where: {
                is_public: 1,
            },
            order: [
                ['sort_order', 'ASC'],
                ['id', 'DESC'],
            ],
        });
        res.json(results);
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        await Article.increment('view_count', { where: { [Sequelize.Op.or]: [{ id }, { slug: id }] } });

        const results = await Article.findOne({
            where: { [Sequelize.Op.or]: [{ id }, { slug: id }], is_public: true },
        });
        res.json(results);
    },
};

module.exports = articleController;
