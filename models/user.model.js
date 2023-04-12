const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Role = require('./Role.model');

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        timestamps: false,
    }
);

User.belongsTo(Role, { foreignKey: 'role_id', sourceKey: 'id' });

module.exports = User;
