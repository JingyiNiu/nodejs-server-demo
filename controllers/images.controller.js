const imageController = {
    uploadImage: (req, res) => {
        try {
            res.send('uploadImage');
        } catch (error) {
            console.log(error.message);
        }
    },
};

module.exports = imageController;