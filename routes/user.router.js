const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user.controller');

const upload = multer();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/', upload.fields([{ name: 'username' }, { name: 'text' }]), userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
