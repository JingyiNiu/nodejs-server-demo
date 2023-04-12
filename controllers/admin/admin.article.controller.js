const Joi = require('joi');
const sequelize = require('../../config/database');

const Article = require('../../models/Article.model');
const Tag = require('../../models/Tag.model');

const adminArticleController = {
    getAllArticles: async (req, res) => {
        const articles = await Article.findAll({
            order: [
                ['sort_order', 'ASC'],
                ['id', 'DESC'],
            ],
            include: {
                model: Tag,
                through: { attributes: [] },
            },
        });
        res.json(articles);
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        const article = await Article.findAll({
            where: { id },
            include: {
                model: Tag,
                through: { attributes: [] },
            },
        });
        res.json(article);
    },

    createArticle: async (req, res) => {
        const { error, value } = validateArticleForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { title, slug, content, is_public, sort_order, tags } = req.body;

        const article = await sequelize.transaction(async (t) => {
            const article = await Article.create({ title, slug, content, is_public, sort_order }, { transaction: t });

            for (const tagId of tags) {
                await article.addTag(tagId, { transaction: t });
            }

            return article;
        });

        res.json(article);
    },

    updateArticle: async (req, res) => {
        const { error, value } = validateArticleForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { title, slug, content, is_public, sort_order, tags } = req.body;

        await sequelize.transaction(async (t) => {
            const article = await Article.findOne({ where: { id } }, { transaction: t });

            await article.setTags(tags, { transaction: t });

            await article.update({ title, slug, content, is_public, sort_order }, { transaction: t });
        });

        const updatedArticle = await Article.findOne({
            where: { id },
            include: { model: Tag, through: { attributes: [] } },
        });

        res.json(updatedArticle);
    },
};

module.exports = adminArticleController;

const validateArticleForm = (articleForm) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        slug: Joi.string().min(2).max(100).required(),
        content: Joi.string().min(2).required(),
        is_public: Joi.number(),
        sort_order: Joi.number(),
        tags: Joi.array(),
    });
    return schema.validate(articleForm);
};
