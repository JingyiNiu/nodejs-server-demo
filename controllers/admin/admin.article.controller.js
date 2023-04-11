const connection = require('../../config/databse');
const Joi = require('joi');

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
        const sql = `INSERT INTO ${article_table} (title, slug, content, is_public, sort_order, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await connection.query(sql, [title, slug, content, is_public, sort_order, new Date()]);

        const newArticleId = result.insertId;
        const sqlInsertArticleTag = `INSERT INTO ${article_tag_table} (article_id, tag_id) VALUES ?`;
        const values = tags.map((tagId) => [newArticleId, tagId]);
        await connection.query(sqlInsertArticleTag, [values]);
        res.json({ data: 'Record created successfully' });
    },

    updateArticle: async (req, res) => {
        const { error, value } = validateArticleForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { title, slug, content, is_public, sort_order, tags } = req.body;

        const sql = `UPDATE ${article_table} 
                    SET title = ?, slug = ?, content = ?, is_public = ?, sort_order = ?, updated_at = ? 
                    WHERE id = ? OR slug = ?`;
        const [result] = await connection.query(sql, [title, slug, content, is_public, sort_order, new Date(), id, id]);

        const update_tag_sql = `INSERT INTO ${article_tag_table} (article_id, tag_id) VALUES ?`;
        const values = tags.map((tagId) => [id, tagId]);
        await connection.query(update_tag_sql, [values]);
        res.json({ data: result });
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
