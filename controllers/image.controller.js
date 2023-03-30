const crypto = require('crypto');

const { uploadFile } = require('../config/s3');

const imageController = {
    uploadImage: async (req, res) => {
        const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
        const { buffer, mimetype } = req.file;
        const imageName = 'images/' + generateFileName();

        await uploadFile(buffer, imageName, mimetype);
        res.status(200).json({
            status: 'success',
            data: { url: imageName },
        });
    },
};

module.exports = imageController;
