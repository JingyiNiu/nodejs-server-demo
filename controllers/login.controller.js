const connection = require('../config/databse');
const Joi = require('joi');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.TOKEN_SECRET_KEY;
const table_name = 'user';

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const sql = `SELECT password FROM ${table_name} WHERE email = ?`;
        const [rows, fields] = await connection.query(sql, [email]);
        if (!rows.length) {
            res.status(404).json({ error: 'No user with given email found' });
            return;
        }

        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const payload = { email };
        const options = { expiresIn: '2h' };
        const token = jwt.sign(payload, secretKey, options);

        res.status(200).send(token);
    },
};

module.exports = loginController;
