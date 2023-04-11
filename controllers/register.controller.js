const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model');

const registerController = {
    register: async (req, res) => {
        const { error } = validateClientUserForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username, email, password: hashedPassword });
        
        res.status(200).send('Record created successfully');
    },

    adminRegister: async (req, res) => {
        const { error } = validateAdminUserForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password, role_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username, email, role_id, password: hashedPassword });

        res.status(200).send('Record created successfully');
    },
};

module.exports = registerController;

const validateClientUserForm = (userForm) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(256).required(),
    });
    return schema.validate(userForm);
};

const validateAdminUserForm = (userForm) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(256).required(),
        role_id: Joi.string().min(1).max(1),
    });
    return schema.validate(userForm);
};