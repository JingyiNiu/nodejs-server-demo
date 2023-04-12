const sequelize = require('../config/databse');
const { DataTypes } = require('sequelize');

const Intro = sequelize.define(
    'intro',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'intros',
        timestamps: false,
    }
);

module.exports = Intro;
