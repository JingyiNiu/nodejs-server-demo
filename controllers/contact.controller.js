const connection = require('../config/databse');
const Joi = require('joi');

const table_name = 'contacts';

const contactController = {
    createContact: async (req, res) => {
        const { error, value } = validateContactForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        
        const { name, email, message } = req.body;
        const sql = `INSERT INTO ${table_name} (name, email, message, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?)`;
        const [rows, fields] = await connection.query(sql, [name, email, message, new Date(), new Date()]);
        res.json({ data: 'Record created successfully' });
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
