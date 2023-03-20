const connection = require('../config/databse');

const table_name = 'self_intro';

const selfIntroController = {
    getSelfIntro: async (req, res) => {
        try {
            const sql = `SELECT * FROM ${table_name}`;
            const [rows, fields] = await connection.query(sql);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    getSelfIntroById: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `SELECT * FROM ${table_name} WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, [id]);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    createSelfIntro: async (req, res) => {
        try {
            const { content_en, content_zh } = req.body;
            const sql = `INSERT INTO ${table_name} (en, zh, created_at, updated_at) VALUES (?, ?, ?, ?)`;
            const [rows, fields] = await connection.query(sql, [
                content_en,
                content_zh,
                new Date(),
                new Date(),
            ]);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    updateSelfIntroEnglishVersion: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const sql = `UPDATE ${table_name} SET en = ?, updated_at = ? WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, [content, new Date(), id]);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    updateSelfIntroChineseVersion: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const sql = `UPDATE ${table_name} SET zh = ?, updated_at = ? WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, [content, new Date(), id]);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    deleteSelfIntro: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `DELETE FROM ${table_name} WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, id);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
};

module.exports = selfIntroController;
