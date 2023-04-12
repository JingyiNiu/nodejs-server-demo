const Role = require('../../models/Role.model');

const roleController = {
    getAllRoles: async (req, res) => {
        const roles = await Role.findAll();
        res.json(roles);
    },

    getOneRole: async (req, res) => {
        const { id } = req.params;
        const role = await Role.findOne({ where: { id } });
        res.json(role);
    },

    createRole: async (req, res) => {
        const { name } = req.body;
        const role = await Role.create({ name });
        res.json(role);
    },

    updateRole: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        await Role.update({ name }, { where: { id } });

        const updatedRole = await Role.findOne({ where: { id } });
        res.json(updatedRole);
    },
};

module.exports = roleController;
