const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = multer({ storage: multer.memoryStorage() });

const adminValidateController = require('../controllers/admin/admin.validate.controller');
const adminIntroController = require('../controllers/admin/admin.intro.controller');
const adminArticleController = require('../controllers/admin/admin.article.controller');
const adminContactController = require('../controllers/admin/admin.contact.controller');
const adminUserController = require('../controllers/admin/admin.user.controller');
const adminImageController = require('../controllers/admin/admin.image.controller');
const adminTagController = require('../controllers/admin/admin.tag.controller');
const adminRoleController = require('../controllers/admin/admin.role.controller');

// Admin Validate
router.get('/validate', adminMiddleware, adminValidateController.validateAdmin);

// Admin Intro
const homeInputFields = [{ name: 'intro_en' }, { name: 'intro_zh' }];
router.get('/intro', adminMiddleware, adminIntroController.getIntros);
router.put('/intro/:id', adminMiddleware, upload.fields(homeInputFields), adminIntroController.updateIntro);

// Admin Article
const articleInputFields = [{ name: 'title' }, { name: 'slug' }, { name: 'content' }, { name: 'is_public' }];
router.get('/article', adminMiddleware, adminArticleController.getAllArticles);
router.get('/article/:id', adminMiddleware, adminArticleController.getOneArticle);
router.post('/article', adminMiddleware, upload.fields(articleInputFields), adminArticleController.createArticle);
router.put('/article/:id', adminMiddleware, upload.fields(articleInputFields), adminArticleController.updateArticle);

// Admin User
const userInputFields = [{ name: 'username' }, { name: 'email' }, { name: 'password' }];
router.get('/user', adminMiddleware, adminUserController.getAllUsers);
router.get('/user/:id', adminMiddleware, adminUserController.getOneUser);
router.post('/user', adminMiddleware, upload.fields(userInputFields), adminUserController.createUser);
router.delete('/user/:id', adminMiddleware, adminUserController.deleteUser);

// Admin Contact
router.get('/contact', adminMiddleware, adminContactController.getAllContacts);
router.get('/contact/:id', adminMiddleware, adminContactController.getOneContact);

// Admin Image
router.post('/image', adminMiddleware, upload.single('image'), adminImageController.uploadImage);
router.get('/image/:id', adminMiddleware, adminImageController.getImage);

// Admin Tag
const tagInputFields = [{ name: 'title' }, { name: 'slug' }, { name: 'description' }];
router.get('/tag', adminMiddleware, adminTagController.getAllTags);
router.get('/tag/:id', adminMiddleware, adminTagController.getOneTag);
router.post('/tag', adminMiddleware, upload.fields(tagInputFields), adminTagController.createTag);
router.put('/tag/:id', adminMiddleware, upload.fields(tagInputFields), adminTagController.updateTag);
router.delete('/tag/:id', adminMiddleware, adminTagController.deleteTag);

// Admin Role
const roleInputFields = [{ name: 'name' }];
router.get('/role', adminRoleController.getAllRoles);
router.get('/role/:id', adminRoleController.getOneRole);
router.post('/role', upload.fields(roleInputFields), adminRoleController.createRole);
router.put('/role/:id', upload.fields(roleInputFields), adminRoleController.updateRole);

module.exports = router;
