const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model');

const registerController = {
    register: async (req, res) => {
        const { error } = validateRegisterForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username, email, password: hashedPassword });

        res.status(200).send({ message: 'Record created successfully' });
    },
};

module.exports = registerController;

const validateRegisterForm = (userForm) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(256).required(),
    });
    return schema.validate(userForm);
};
