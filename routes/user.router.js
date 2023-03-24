const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const upload = multer();
const inputFields = [{ name: 'username' }, { name: 'email' }, { name: 'password' }];

router.post('/', upload.fields(inputFields), userController.createUser);

router.get('/', adminMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getOneUser);
router.put('/:id', authMiddleware, upload.fields(inputFields), userController.updatePassword);
router.delete('/:id', adminMiddleware, userController.deleteUser);

module.exports = router;
