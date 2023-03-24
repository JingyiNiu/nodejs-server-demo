const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer();
const inputFields = [{ name: 'username' }, { name: 'email' }, { name: 'password' }];

router.post('/', upload.fields(inputFields), userController.createUser);
router.put('/:id', authMiddleware, upload.fields(inputFields), userController.updatePassword);

module.exports = router;
