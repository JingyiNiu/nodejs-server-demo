const { Op } = require('sequelize');

const Article = require('../../models/Article.model');
const Tag = require('../../models/Tag.model');
const User = require('../../models/User.model');
const Contact = require('../../models/Contact.model');

const adminDashboardController = {
    getDashboardInfo: async (req, res) => {
        const [articles, tags, users, contacts, contacts_7days_ago] = await Promise.all([
            Article.count(),
            Tag.count(),
            User.count(),
            Contact.count(),
            Contact.count({
                where: {
                    created_at: {
                        [Op.lt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            }),
        ]);
        res.json({
            articles,
            tags,
            users,
            contacts: { now: contacts, '7days_ago': contacts_7days_ago },
        });
    },
};

module.exports = adminDashboardController;
