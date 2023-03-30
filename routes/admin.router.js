const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminValidateController = require('../controllers/admin/admin.validate.controller');
const adminHomeController = require('../controllers/admin/admin.home.controller');
const adminArticleController = require('../controllers/admin/admin.article.controller');
const adminContactController = require('../controllers/admin/admin.contact.controller');
const adminUserController = require('../controllers/admin/admin.user.controller');
const adminImageController = require('../controllers/admin/admin.image.controller');

const adminMiddleware = require('../middlewares/adminMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// Admin Validate
router.get('/validate', adminMiddleware, adminValidateController.validateAdmin);

// Admin Home
const homeInputFields = [{ name: 'intro_en' }, { name: 'intro_zh' }];
router.get('/home', adminMiddleware, adminHomeController.getHomeData);
router.put('/home/:id', adminMiddleware, upload.fields(homeInputFields), adminHomeController.updateHomeData);

// Admin Article
const articleInputFields = [{ name: 'title' }, { name: 'slug' }, { name: 'content' }, { name: 'is_public' }];
router.get('/article', adminMiddleware, adminArticleController.getAllArticles);
router.get('/article/:id', adminMiddleware, adminArticleController.getOneArticle);
router.post('/article', adminMiddleware, upload.fields(articleInputFields), adminArticleController.createArticle);
router.put('/article/:id', adminMiddleware, upload.fields(articleInputFields), adminArticleController.updateArticle);
router.delete('/article/:id', adminMiddleware, adminArticleController.deleteArticle);
router.put(
    '/article-public-status/:id',
    adminMiddleware,
    upload.fields([{ name: 'is_public' }]),
    adminArticleController.updateArticlePublicStatus
);

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
router.post('/images', adminMiddleware, upload.single('image'), adminImageController.uploadImage);
router.post('/image', adminMiddleware, upload.single('image'), adminImageController.uploadImage);
router.get('/image/:id', adminMiddleware, adminImageController.getImage);

module.exports = router;
