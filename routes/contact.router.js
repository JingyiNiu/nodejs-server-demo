const express = require('express');
const router = express.Router();
const multer = require('multer');
const contactController = require('../controllers/contact.controller');

const upload = multer();
const inputFields = [{ name: 'name' }, { name: 'email' }, { name: 'message' }];

router.post('/', upload.fields(inputFields), contactController.createContact);

module.exports = router;
