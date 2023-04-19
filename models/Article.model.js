const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const ArticleTag = require('./ArticleTag.model');
const Tag = require('./Tag.model');

const Article = sequelize.define(
    'article',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sort_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        is_public: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title_zh: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content_zh: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        view_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'articles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Article.belongsToMany(Tag, { through: ArticleTag, foreignKey: 'article_id' });
Tag.belongsToMany(Article, { through: ArticleTag, foreignKey: 'tag_id' });

module.exports = Article;
