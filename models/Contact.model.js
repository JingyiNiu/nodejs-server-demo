const sequelize = require('../config/databse');
const { DataTypes } = require('sequelize');

const Contact = sequelize.define(
    'Contact',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'contacts',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Contact;
