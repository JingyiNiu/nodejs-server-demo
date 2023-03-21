const express = require('express');
const router = express.Router();
const multer = require('multer');
const contactController = require('../controllers/contact.controller');
const adminMiddleware = require('../middlewares/adminMiddleware');

const upload = multer();
const inputFields = [{ name: 'name' }, { name: 'email' }, { name: 'message' }];

router.get('/', adminMiddleware, contactController.getAllContacts);
router.get('/:id', adminMiddleware, contactController.getOneContact);
router.post('/', upload.fields(inputFields), contactController.createContact);
router.put('/:id', upload.fields(inputFields), adminMiddleware, contactController.updateContact);
router.delete('/:id', adminMiddleware, contactController.deleteContact);

module.exports = router;
