const connection = require('../../config/databse');
const Joi = require('joi');

const intro_table = 'intros';

const introController = {
    getIntroData: async (req, res) => {
        const sql = `SELECT * FROM ${intro_table}`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },
    updateIntroData: async (req, res) => {
        const { error, value } = validateIntroForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { title, content } = req.body;
        const sql = `UPDATE ${intro_table} 
                    SET title = ?, content = ?, updated_at = ? 
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [title, content, new Date(), id]);
        res.json({ data: 'Record updated successfully' });
    },
};

module.exports = introController;

const validateIntroForm = (homeForm) => {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        content: Joi.string().min(2).required(),
    });
    return schema.validate(homeForm);
};
