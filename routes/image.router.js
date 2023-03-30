const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageController = require('../controllers/image.controller');

router.post('/', upload.single('image'), imageController.uploadImage);

module.exports = router;
