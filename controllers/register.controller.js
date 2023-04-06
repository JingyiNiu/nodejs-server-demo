const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model');
const UserRole = require('../models/UserRole.model')

const secretKey = process.env.TOKEN_SECRET_KEY;

const registerController = {
    register: async (req, res) => {
        const { error } = validateUserInput(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(200).send('Record created successfully');
    },

    adminRegister: async (req, res) => {
        const { error } = validateUserInput(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, email, password: hashedPassword });

        await UserRole.create({ user_id: user.id, role_id: role });
        res.status(200).send('Record created successfully');
    },
};

module.exports = registerController;

const validateUserInput = (userForm) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(256).required(),
        role: Joi.string().min(1).max(1),
    });
    return schema.validate(userForm);
};