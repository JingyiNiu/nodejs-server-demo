const express = require('express');
const router = express.Router();
const multer = require('multer');
const loginController = require('../controllers/login.controller');

const upload = multer();
const inputFields = [{ name: 'email' }, { name: 'password' }];

router.post('/', upload.fields(inputFields), loginController.login);
router.post('/admin', upload.fields(inputFields), loginController.adminLogin);

module.exports = router;
