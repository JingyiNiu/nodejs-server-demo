const express = require('express');
const router = express.Router();
const multer = require('multer');
const roleController = require('../controllers/role.controller');

const upload = multer();
const inputFields = [{ name: 'name' }];

router.get('/', roleController.getAllRoles);
router.post('/', upload.fields(inputFields), roleController.createRole);

module.exports = router;
