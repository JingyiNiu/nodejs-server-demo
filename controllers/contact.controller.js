const connection = require('../config/databse');
const Joi = require('joi');

const contactController = {
    getAllContacts: async (req, res) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM contact');
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

            const [rows, fields] = await connection.query(
                'SELECT * FROM `contact` WHERE `id` = ?',
                [id]
            );
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
            const sql =
                'INSERT INTO `contact`(name,email,message,created_at,updated_at) VALUES(?,?,?,?,?)';
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
