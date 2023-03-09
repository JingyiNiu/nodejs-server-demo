const articleController = {
    getAllArticles: (req, res) => {
        try {
            res.send('getAllArticles');
        } catch (error) {
            console.log(error.message);
        }
    },
};

module.exports = articleController;
