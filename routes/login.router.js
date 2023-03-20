const express = require('express');
const router = express.Router();
const multer = require('multer');
const loginController = require('../controllers/login.controller');

const upload = multer();

router.post('/', upload.fields([{ name: 'email' }, { name: 'password' }]), loginController.login);

module.exports = router;
