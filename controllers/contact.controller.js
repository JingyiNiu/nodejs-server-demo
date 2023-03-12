const connection = require('../config/databse');
const Joi = require('joi');

const table_name = 'contact';

const contactController = {
    getAllContacts: async (req, res) => {
        try {
            const sql = `SELECT * FROM ${table_name}`;
            const [rows, fields] = await connection.query(sql);
            res.json({
                data: rows,
            });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    getOneContact: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `SELECT * FROM ${table_name} WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, [id]);
            res.json({
                data: rows,
            });
        } catch (error) {
            res.json({ status: 'Error', message: error.message });
        }
    },
    createContact: async (req, res) => {
        try {
            const { error, value } = validateContactForm(req.body);
            if (error) {
                res.status(400).json({ status: 'Error', message: error.details[0].message });
                return;
            }
            const { name, email, message } = req.body;
            const sql = `INSERT INTO ${table_name} (name, email, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;
            const [rows, fields] = await connection.query(sql, [
                name,
                email,
                message,
                new Date(),
                new Date(),
            ]);
            res.json({
                data: rows,
            });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    updateContact: async (req, res) => {
        try {
            const { error, value } = validateContactForm(req.body);
            if (error) {
                res.status(400).json({ status: 'Error', message: error.details[0].message });
                return;
            }
            const { id } = req.params;
            const { name, email, message } = req.body;
            const sql = `UPDATE ${table_name} SET name = ?, email = ?, message = ?, updated_at = ? WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, [
                name,
                email,
                message,
                new Date(),
                id,
            ]);
            res.json({
                data: rows,
            });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    deleteContact: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `DELETE FROM ${table_name} WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, id);
            res.json({
                data: rows,
            });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
};

module.exports = contactController;

const validateContactForm = (contactForm) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        message: Joi.string().min(2).required(),
    });
    return schema.validate(contactForm);
};
