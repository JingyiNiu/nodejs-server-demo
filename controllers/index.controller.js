const indexController = {
    getIndexContent: (req, res) => {
        try {
            res.send('Hello World');
        } catch (error) {
            res.status(500).json({ status: 'Error', message: error.message });
        }
    },
};

module.exports = indexController;
