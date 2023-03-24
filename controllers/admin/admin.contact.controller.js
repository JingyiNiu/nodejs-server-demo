const connection = require('../../config/databse');
const Joi = require('joi');

const contact_table = 'contact';

const adminController = {
    getAllContacts: async (req, res) => {
        const sql = `SELECT * FROM ${contact_table}`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getOneContact: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${contact_table} \
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: rows });
    },

    updateContact: async (req, res) => {
        const { error, value } = validateContactForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { id } = req.params;
        const { name, email, message } = req.body;
        const sql = `UPDATE ${contact_table} 
                    SET name = ?, email = ?, message = ?, updated_at = ? 
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [name, email, message, new Date(), id]);
        res.json({ data: 'Record updated successfully' });
    },

    deleteContact: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${contact_table} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: 'Record deleted successfully' });
    },
};

module.exports = adminController;

const validateContactForm = (contactForm) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        message: Joi.string().min(2).required(),
    });
    return schema.validate(contactForm);
};