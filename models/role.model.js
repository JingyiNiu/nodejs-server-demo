const sequelize = require('../config/databse');
const { DataTypes } = require('sequelize');

const Role = sequelize.define(
    'role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        tableName: 'roles',
        timestamps: false,
    }
);

module.exports = Role;
