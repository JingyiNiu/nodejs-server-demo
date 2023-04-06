const Joi = require('joi');
const Role = require('../models/Role.model');

const roleController = {
    getAllRoles: async (req, res) => {
        const result = await Role.findAll();
        res.json(result);
    },

    createRole: async (req, res) => {
        const { name } = req.body;
        const result = await Role.create({ name });
        res.json(result);
    },
};

module.exports = roleController;
