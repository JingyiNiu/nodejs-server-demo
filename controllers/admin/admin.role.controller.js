const Role = require('../../models/Role.model');

const roleController = {
    getAllRoles: async (req, res) => {
        const roles = await Role.findAll();
        res.json(roles);
    },

    createRole: async (req, res) => {
        const { name } = req.body;
        const role = await Role.create({ name });
        res.json(role);
    },
};

module.exports = roleController;
