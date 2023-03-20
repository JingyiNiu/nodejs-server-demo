const connection = require('../config/databse');

const table_name = 'self_intro';

const selfIntroController = {
    getSelfIntro: async (req, res) => {
        const sql = `SELECT * FROM ${table_name}`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getSelfIntroById: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${table_name} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: rows });
    },

    createSelfIntro: async (req, res) => {
        const { content_en, content_zh } = req.body;
        const sql = `INSERT INTO ${table_name} (en, zh, created_at, updated_at) VALUES (?, ?, ?, ?)`;
        const [rows, fields] = await connection.query(sql, [content_en, content_zh, new Date(), new Date()]);
        res.json({ data: rows });
    },

    updateSelfIntroEnglishVersion: async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const sql = `UPDATE ${table_name} SET en = ?, updated_at = ? WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [content, new Date(), id]);
        res.json({ data: rows });
    },

    updateSelfIntroChineseVersion: async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const sql = `UPDATE ${table_name} SET zh = ?, updated_at = ? WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [content, new Date(), id]);
        res.json({ data: rows });
    },

    deleteSelfIntro: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${table_name} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, id);
        res.json({ data: rows });
    },
};

module.exports = selfIntroController;
