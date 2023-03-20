const connection = require('../config/databse');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const table_name = 'user';

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const sql = `SELECT username, email FROM ${table_name}`;
            const [rows, fields] = await connection.query(sql);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    getOneUser: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `SELECT username, email FROM ${table_name} WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, [id]);
            res.json({ data: rows });
        } catch (error) {
            res.json({ status: 'Error', message: error.message });
        }
    },
    createUser: async (req, res) => {
        try {
            const { error } = validateUserForm(req.body);
            if (error) {
                res.status(400).json({ status: 'Error', message: error.details[0].message });
                return;
            }
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const sql = `INSERT INTO ${table_name} (username, email, password, created_at) VALUES (?, ?, ?, ?)`;
            const [rows, fields] = await connection.query(sql, [username, email, hashedPassword, new Date()]);

            res.json({ data: rows });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(500).json({ status: 'Error', message: 'User already exists' });
                return;
            }
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    updateUserPassword: async (req, res) => {
        try {
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `DELETE FROM ${table_name} WHERE id = ?`;
            const [rows, fields] = await connection.query(sql, id);
            res.json({ data: rows });
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
};

module.exports = userController;

const validateUserForm = (userForm) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(256).required(),
    });
    return schema.validate(userForm);
};
