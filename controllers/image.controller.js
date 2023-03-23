const crypto = require('crypto');

const { uploadFile, getPresignedUrl } = require('../config/s3');

const imageController = {
    getImage: async (req, res) => {
        const url = await getPresignedUrl(req.params.id);
        res.send(url);
    },
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
