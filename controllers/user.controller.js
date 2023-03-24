const connection = require('../config/databse');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const user_table = 'user';

const userController = {
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
