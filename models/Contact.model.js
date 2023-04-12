const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Contact = sequelize.define(
    'contact',
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
    },
    {
        tableName: 'contacts',
        timestamps: false,
    }
);

module.exports = Contact;
