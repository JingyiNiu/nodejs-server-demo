const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.AWS_RDS_DB_NAME,
    process.env.AWS_RDS_DB_USERNAME,
    process.env.AWS_RDS_DB_PASSWORD,
    {
        host: process.env.AWS_RDS_DB_HOST,
        dialect: 'mysql',
    }
);

module.exports = sequelize;
