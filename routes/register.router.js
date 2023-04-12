const express = require('express');
const router = express.Router();
const multer = require('multer');
const registerController = require('../controllers/register.controller');

const upload = multer();
const inputFields = [{ name: 'email' }, { name: 'password' }];

router.post('/', upload.fields(inputFields), registerController.register);

module.exports = router;