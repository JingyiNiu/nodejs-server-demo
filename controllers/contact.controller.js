const Contact = require('../models/Contact.model');
const Joi = require('joi');

const contactController = {
    createContact: async (req, res) => {
        const { error, value } = validateContactForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { name, email, message } = req.body;
        const result = await Contact.create({ name, email, message });
        res.json(result);
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
