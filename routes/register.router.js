const express = require('express');
const router = express.Router();
const multer = require('multer');
const registerController = require('../controllers/register.controller');
const adminMiddleware = require('../middlewares/adminMiddleware');

const upload = multer();
const inputFields = [{ name: 'email' }, { name: 'password' }];

router.post('/', upload.fields(inputFields), registerController.register);
router.post('/admin', adminMiddleware, upload.fields(inputFields), registerController.adminRegister);

module.exports = router;