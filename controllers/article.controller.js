const connection = require('../config/databse');

const article_table = 'article';

const articleController = {
    getAllArticles: async (req, res) => {
        const sql = `SELECT * FROM ${article_table}
                    WHERE is_public = 1
                    ORDER BY sort_order ASC, id DESC`;
        const [results] = await connection.query(sql);
        res.json({ data: results });
    },

    getOneArticle: async (req, res) => {
        const { id } = req.params;
        const updateSql = `UPDATE ${article_table} 
                            SET view_count = view_count + 1 
                            WHERE id = ? OR slug = ?`;
        const selectSql = `SELECT * FROM ${article_table} 
                            WHERE (id = ? AND is_public = 1)
                            OR (slug = ? AND is_public = 1)`;
        const [updateResult] = await connection.query(updateSql, [id, id]);
        const [selectResult] = await connection.query(selectSql, [id, id]);
        res.json({ data: selectResult });
    },
};

module.exports = articleController;
