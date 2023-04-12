const connection = require('../../config/databse');
const Joi = require('joi');

const Contact = require('../../models/Contact.model');

const adminController = {
    getAllContacts: async (req, res) => {
        const contacts = await Contact.findAll();
        res.json({ contacts });
    },

    getOneContact: async (req, res) => {
        const { id } = req.params;
        const contact = await Contact.findOne({ where: { id } });
        res.json({ contact });
    },
};

module.exports = adminController;
