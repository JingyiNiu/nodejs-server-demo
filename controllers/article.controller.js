const connection = require('../config/databse');
const Joi = require('joi');

const article_table = 'article';

const articleController = {
    getAllArticles: async (req, res) => {
        const sql = `SELECT * FROM ${article_table}
                    WHERE is_public = 1`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${article_table} 
                    WHERE (id = ? AND is_public = 1)
                    OR (slug = ? AND is_public = 1) `;
        const [rows, fields] = await connection.query(sql, [id, id]);
        res.json({ data: rows });
    },
};

module.exports = articleController;
