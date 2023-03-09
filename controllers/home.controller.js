const homeController = {
    getHomepage: (req, res) => {
        try {
            res.send('Hello World');
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = homeController;