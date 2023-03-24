const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminArticleController = require('../controllers/admin/admin.article.controller');
const adminContactController = require('../controllers/admin/admin.contact.controller');
const adminUserController = require('../controllers/admin/admin.user.controller');
const adminImageController = require('../controllers/admin/admin.image.controller');

const adminMiddleware = require('../middlewares/adminMiddleware');

const upload = multer();

// Admin Article
const articleInputFields = [{ name: 'title' }, { name: 'slug' }, { name: 'content' }];
router.get('/article', adminMiddleware, adminArticleController.getAllArticles);
router.get('/article/:id', adminMiddleware, adminArticleController.getOneArticle);
router.post('/article', adminMiddleware, upload.fields(articleInputFields), adminArticleController.createArticle);
router.put('/article/:id', adminMiddleware, upload.fields(articleInputFields), adminArticleController.updateArticle);
router.delete('/article/:id', adminMiddleware, adminArticleController.deleteArticle);

// Admin User
const userInputFields = [{ name: 'username' }, { name: 'email' }, { name: 'password' }];
router.get('/user', adminMiddleware, adminUserController.getAllUsers);
router.get('/user/:id', adminMiddleware, adminUserController.getOneUser);
router.put('/user/:id', adminMiddleware, upload.fields(userInputFields), adminUserController.updatePassword);
router.delete('/user/:id', adminMiddleware, adminUserController.deleteUser);

// Admin Contact
const contactInputFields = [{ name: 'name' }, { name: 'email' }, { name: 'message' }];
router.get('/contact', adminMiddleware, adminContactController.getAllContacts);
router.get('/contact/:id', adminMiddleware, adminContactController.getOneContact);
router.put('/contact/:id', adminMiddleware, upload.fields(contactInputFields), adminContactController.updateContact);
router.delete('/contact/:id', adminMiddleware, adminContactController.deleteContact);

// Admin Image
router.get('/image/:id', adminMiddleware, adminImageController.getImage);
router.post('/image', adminMiddleware, upload.single('image'), adminImageController.uploadImage);

module.exports = router;
