const connection = require('../config/databse');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const table_name = 'user';

const userController = {
    getAllUsers: async (req, res) => {
        const sql = `SELECT username, email FROM ${table_name}`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getOneUser: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT username, email FROM ${table_name} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: rows });
    },

    createUser: async (req, res) => {
        const { error } = validateUserForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = `INSERT INTO ${table_name} (username, email, password, created_at) VALUES (?, ?, ?, ?)`;
        const [rows, fields] = await connection.query(sql, [username, email, hashedPassword, new Date()]);

        res.json({ data: rows });
    },

    updateUserPassword: async (req, res) => {},

    deleteUser: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${table_name} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, id);
        res.json({ data: rows });
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
