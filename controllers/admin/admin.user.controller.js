const connection = require('../../config/databse');
const Joi = require('joi');

const User = require('../../models/User.model');
const Role = require('../../models/Role.model');

const userController = {
    getAllUsers: async (req, res) => {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email'],
            include: {
                model: Role,
                attributes: ['name'],
            },
        });
        res.json({ users });
    },

    getOneUser: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id },
            attributes: ['id', 'username', 'email'],
            include: {
                model: Role,
                attributes: ['name'],
            },
        });
        res.json({ user });
    },

    updatePassword: async (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM ${user_table}
                    WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, [id]);
        res.json('Record updated successfully' );
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM ${user_table} WHERE id = ?`;
        const [rows, fields] = await connection.query(sql, id);
        res.json('Record deleted successfully deleted');
    },
};

module.exports = userController;
