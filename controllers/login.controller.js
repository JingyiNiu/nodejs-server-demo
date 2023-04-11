const Joi = require('joi');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.TOKEN_SECRET_KEY;
const User = require('../models/User.model');
const Role = require('../models/Role.model');

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'username', 'email', 'password'],
            include: {
                model: Role,
                attributes: ['name'],
            },
        });

        if (!user) {
            res.status(400).json({ error: 'No user with given email found' });
            return;
        }

        const { role } = user;

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const payload = { email, role: role.name };
        const options = { expiresIn: '2h' };
        const token = jwt.sign(payload, secretKey, options);

        res.status(200).send(token);
    },
    adminLogin: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'username', 'email', 'password'],
            include: {
                model: Role,
                attributes: ['name'],
            },
        });

        if (!user) {
            res.status(400).json({ error: 'No user with given email found' });
            return;
        }

        const { role } = user;

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        if (role.name !== 'admin') {
            res.status(403).json({ error: 'User with given email has no permission' });
            return;
        }

        const payload = { email, role: role.name };
        const options = { expiresIn: '2h' };
        const token = jwt.sign(payload, secretKey, options);

        res.status(200).send(token);
    },
};

module.exports = loginController;
