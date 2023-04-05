// const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

// const sequelize = new Sequelize(
//     process.env.AWS_RDS_DB_NAME,
//     process.env.AWS_RDS_DB_USERNAME,
//     process.env.AWS_RDS_DB_PASSWORD,
//     {
//         host: process.env.AWS_RDS_DB_HOST,
//         dialect: 'mysql',
//     }
// );

const connection = mysql.createConnection({
    host: process.env.AWS_RDS_DB_HOST,
    user: process.env.AWS_RDS_DB_USERNAME,
    password: process.env.AWS_RDS_DB_PASSWORD,
    database: process.env.AWS_RDS_DB_NAME, 
    port: process.env.AWS_RDS_DB_PORT,
});

const pool = mysql.createPool({
    host: process.env.AWS_RDS_DB_HOST,
    user: process.env.AWS_RDS_DB_USERNAME,
    password: process.env.AWS_RDS_DB_PASSWORD,
    database: process.env.AWS_RDS_DB_NAME,
    port: process.env.AWS_RDS_DB_PORT,
});

module.exports = connection.promise();
// module.exports = sequelize;
