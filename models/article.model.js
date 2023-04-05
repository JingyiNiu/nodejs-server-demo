// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/databse');

// class Article extends Model {}

// Article.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         sort_order: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         slug: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         is_public: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         content: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         view_count: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize,
//         modelName: 'article',
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//     }
// );

// module.exports = Article;
