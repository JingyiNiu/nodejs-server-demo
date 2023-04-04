const connection = require('../../config/databse');
const Joi = require('joi');

const tag_table = 'tag';

const adminTagController = {
    getAllTags: async (req, res) => {
        const sql = `SELECT * FROM ${tag_table}`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getOneTag: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${tag_table} 
                    WHERE id = ? OR slug = ?`;
        const [rows, fields] = await connection.query(sql, [id, id]);
        res.json({ data: rows });
    },

    createTag: async (req, res) => {
        const { error, value } = validateTagForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { name, slug, description } = req.body;
        const sql = `INSERT INTO ${tag_table} (name, slug, description, created_at) 
                    VALUES (?, ?, ?, ?)`;
        const [rows, fields] = await connection.query(sql, [name, slug, description, new Date()]);
        res.json({ data: 'Record created successfully' });
    },

    updateTag: async (req, res) => {
        const { error, value } = validateTagForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { name, slug, description } = req.body;
        const sql = `UPDATE ${tag_table} 
                    SET name = ?, slug = ?, description = ?, updated_at = ? 
                    WHERE id = ? OR slug = ?`;
        const [rows, fields] = await connection.query(sql, [name, slug, description, new Date(), id, id]);
        res.json({ data: 'Record updated successfully' });
    },

    deleteTag: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${tag_table} 
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: 'Record deleted successfully' });
    },
};

module.exports = adminTagController;

const validateTagForm = (articleForm) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        slug: Joi.string().min(2).max(100).required(),
        description: Joi.string().required(),
    });
    return schema.validate(articleForm);
};
