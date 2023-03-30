const connection = require('../config/databse');

const home_table = 'home';
const article_table = 'article';

const homeController = {
    getHomeData: async (req, res) => {
        const sql1 = `SELECT * FROM ${home_table}`;
        const sql2 = `SELECT * FROM ${article_table}
                        WHERE is_public = 1
                        ORDER BY id DESC 
                        LIMIT 3`;

        const [result1, result2] = await Promise.all([connection.query(sql1), connection.query(sql2)]);
        res.json({ home_intro: result1[0], recent_articles: result2[0] });
    },
};

module.exports = homeController;
