const sequelize = require('../config/databse');
const { DataTypes } = require('sequelize');

const UserRole = sequelize.define(
    'UserRole',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'user_id',
        },
        role_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            field: 'role_id',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    },
    {
        tableName: 'user_roles',
        timestamps: true,
        underscored: true,
    }
);

module.exports = UserRole;
