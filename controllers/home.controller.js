const connection = require('../config/databse');

const intro_table = 'intros';
const article_table = 'articles';

const homeController = {
    getHomeData: async (req, res) => {
        const sql1 = `SELECT * FROM ${intro_table}`;
        const sql2 = `SELECT * FROM ${article_table}
                        WHERE is_public = 1
                        ORDER BY sort_order ASC, id DESC 
                        LIMIT 3`;

        const [result1, result2] = await Promise.all([connection.query(sql1), connection.query(sql2)]);
        res.json({ home_intro: result1[0], recent_articles: result2[0] });
    },
};

module.exports = homeController;
