const sequelize = require('../config/database');
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
