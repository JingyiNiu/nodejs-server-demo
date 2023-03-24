const connection = require('../../config/databse');
const Joi = require('joi');

const article_table = 'article';

const adminController = {
    getAllArticles: async (req, res) => {
        const sql = `SELECT * FROM ${article_table}`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${article_table} 
                    WHERE id = ? OR slug = ?`;
        const [rows, fields] = await connection.query(sql, [id, id]);
        res.json({ data: rows });
    },

    createArticle: async (req, res) => {
        const { error, value } = validateArticleForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { title, slug, content } = req.body;
        const sql = `INSERT INTO ${article_table} (title, slug, content, created_at) 
                    VALUES (?, ?, ?, ?)`;
        const [rows, fields] = await connection.query(sql, [title, slug, content, new Date()]);
        res.json({ data: 'Record created successfully' });
    },

    updateArticle: async (req, res) => {
        const { error, value } = validateArticleForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { title, slug, content } = req.body;
        const sql = `UPDATE ${article_table} 
                    SET title = ?, slug = ?, content = ?, updated_at = ? 
                    WHERE id = ? OR slug = ?`;
        const [rows, fields] = await connection.query(sql, [title, slug, content, new Date(), id, id]);
        res.json({ data: 'Record updated successfully' });
    },

    deleteArticle: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${article_table} 
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: 'Record deleted successfully' });
    },
};

module.exports = adminController;

const validateArticleForm = (articleForm) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        slug: Joi.string().min(2).max(100).required(),
        content: Joi.string().min(2).required(),
    });
    return schema.validate(articleForm);
};
