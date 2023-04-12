const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/client/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer();
const inputFields = [{ name: 'username' }, { name: 'email' }, { name: 'password' }];

router.put('/update-password', authMiddleware, upload.fields(inputFields), userController.updatePassword);

module.exports = router;
