const sequelize = require('../config/databse');
const { DataTypes } = require('sequelize');

const ArticleTag = sequelize.define(
    'article_tag',
    {
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'article_tags',
        timestamps: false
    }
);

module.exports = ArticleTag;
