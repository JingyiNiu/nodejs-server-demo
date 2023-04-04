const connection = require('../../config/databse');
const Joi = require('joi');

const article_table = 'article';
const tag_table = 'tag';
const article_tag_table = 'article_tag';

const adminArticleController = {
    getAllArticles: async (req, res) => {
        const sql = `SELECT * FROM ${article_table}
                    ORDER BY sort_order ASC, id DESC`;
        const [result] = await connection.query(sql);
        res.json({ data: result });
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT A.*, GROUP_CONCAT(T.name) AS tags 
                    FROM ${article_table} A
                    LEFT JOIN ${article_tag_table} AT ON A.id = AT.article_id
                    LEFT JOIN ${tag_table} T ON AT.tag_id = T.id
                    WHERE A.id = ? OR A.slug = ?
                    GROUP BY A.id`;
        const [result] = await connection.query(sql, [id, id]);
        res.json({ data: result });
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

    deleteArticle: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${article_table} 
                    WHERE id = ?`;
        const [result] = await connection.query(sql, [id]);
        res.json({ data: 'Record deleted successfully' });
    },

    updateArticlePublicStatus: async (req, res) => {
        const { id } = req.params;
        const { is_public } = req.body;
        const sql = `UPDATE ${article_table} 
                    SET is_public = ?, updated_at = ? 
                    WHERE id = ? OR slug = ?`;
        const [result] = await connection.query(sql, [is_public, new Date(), id, id]);
        res.json({ data: 'Record updated successfully' });
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
        tags:Joi.array()
    });
    return schema.validate(articleForm);
};
