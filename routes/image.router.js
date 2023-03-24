const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const adminMiddleware = require('../middlewares/adminMiddleware');
const imageController = require('../controllers/image.controller');

router.get('/:id', adminMiddleware, imageController.getImage);
router.post('/', adminMiddleware, upload.single('image'), imageController.uploadImage);

module.exports = router;
