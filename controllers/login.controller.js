const connection = require('../config/databse');
const Joi = require('joi');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.TOKEN_SECRET_KEY;
const user_table = 'user';
const role_table = 'role';
const user_role_table = 'user_role';

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const sql = `SELECT U.password, U.username, U.email, R.name AS role 
                    FROM ${user_table} U
                    LEFT JOIN ${user_role_table} UR ON U.id = UR.user_id 
                    LEFT JOIN ${role_table} R ON R.id = UR.role_id 
                    WHERE U.email = ?`;
        const [rows, fields] = await connection.query(sql, [email]);
        if (!rows.length) {
            res.status(400).json({ error: 'No user with given email found' });
            return;
        }

        const { role } = rows[0];

        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const payload = { email, role };
        const options = { expiresIn: '2h' };
        const token = jwt.sign(payload, secretKey, options);

        res.status(200).send(token);
    },
    adminLogin: async (req, res) => {
        const { email, password } = req.body;

        const sql = `SELECT U.password, U.username, U.email, R.name AS role 
                    FROM ${user_table} U
                    LEFT JOIN ${user_role_table} UR ON U.id = UR.user_id 
                    LEFT JOIN ${role_table} R ON R.id = UR.role_id 
                    WHERE U.email = ?`;
        const [rows, fields] = await connection.query(sql, [email]);

        if (!rows.length) {
            res.status(400).json({ error: 'No user with given email found' });
            return;
        }

        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const { role } = rows[0];

        if (!role) {
            res.status(403).json({ error: 'User with given email has no permission' });
            return;
        }

        const payload = { email, role };
        const options = { expiresIn: '2h' };
        const token = jwt.sign(payload, secretKey, options);

        res.status(200).send(token);
    },
};

module.exports = loginController;
