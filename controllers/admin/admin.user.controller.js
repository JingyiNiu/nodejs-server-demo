const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../../models/User.model');
const Role = require('../../models/Role.model');

const userController = {
    getAllUsers: async (req, res) => {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email'],
            include: {
                model: Role,
                attributes: ['name'],
            },
        });
        res.json({ users });
    },

    getOneUser: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id },
            attributes: ['id', 'username', 'email'],
            include: {
                model: Role,
                attributes: ['name'],
            },
        });
        res.json({ user });
    },

    createUser: async (req, res) => {
        const { error } = validateUserForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password, role_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username, email, role_id, password: hashedPassword });

        res.status(200).send({ message: 'Record created successfully' });
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ message: 'Record deleted successfully' });
    },
};

module.exports = userController;

const validateUserForm = (userForm) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(256).required(),
        role_id: Joi.string().min(1).max(1),
    });
    return schema.validate(userForm);
};
