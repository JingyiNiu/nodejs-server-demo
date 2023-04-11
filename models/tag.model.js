const sequelize = require('../config/databse');
const { DataTypes } = require('sequelize');

const Tag = sequelize.define(
    'tag',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'tags',
        timestamps: false
    }
);

module.exports = Tag;
