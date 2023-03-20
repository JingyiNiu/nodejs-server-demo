const express = require('express');
const router = express.Router();

const imageController = require('../controllers/images.controller');

router.post('/', imageController.uploadImage);

module.exports = router;

// const crypto = require('crypto');
// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// const { uploadFile, getFile } = require('./s3');

// const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
// app.post('/api/images/upload', upload.single('image'), async (req, res) => {
//     const { buffer, mimetype } = req.file;
//     const imageName = 'images/' + generateFileName();

//     try {
//         await uploadFile(buffer, imageName, mimetype);
//         res.status(200).json({
//             status: 'success',
//             data: { url: imageName },
//         });
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
