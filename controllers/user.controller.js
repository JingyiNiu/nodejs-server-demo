const connection = require('../config/databse');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const user_table = 'user';
const role_table = 'role';
const user_role_table = 'user_role';

const userController = {
    getAllUsers: async (req, res) => {
        const sql = `SELECT U.id, U.username, U.email, R.name AS role 
                    FROM ${user_table} U
                    LEFT JOIN ${user_role_table} UR ON U.id = UR.user_id 
                    LEFT JOIN ${role_table} R ON R.id = UR.role_id`;
        const [rows, fields] = await connection.query(sql);
        res.json({ data: rows });
    },

    getOneUser: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT U.id, U.username, U.email, R.name AS role 
                    FROM ${user_table} U
                    LEFT JOIN ${user_role_table} UR ON U.id = UR.user_id 
                    LEFT JOIN ${role_table} R ON R.id = UR.role_id 
                    WHERE U.id = ?`;
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

        const sql = `INSERT INTO ${user_table} (username, email, password, created_at) VALUES (?, ?, ?, ?)`;
        const [rows, fields] = await connection.query(sql, [username, email, hashedPassword, new Date()]);

        res.json({ data: 'Record created successfully' });
    },

    updatePassword: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${user_table}
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json({ data: 'Record updated successfully' });
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${user_table} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, id);
        res.json({ data: 'Record deleted successfully deleted' });
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
