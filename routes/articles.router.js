const express = require('express');
const router = express.Router();
const multer = require('multer');
const articleController = require('../controllers/article.controller');
const adminMiddleware = require('../middlewares/adminMiddleware');

const upload = multer();
const inputFields = [{ name: 'title' }, { name: 'slug' }, { name: 'content' }];

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getOneArticle);

router.get('/admin', adminMiddleware, articleController.getAllArticles);
router.get('/admin/:id', adminMiddleware, articleController.getOneArticle);
router.post('/', adminMiddleware, upload.fields(inputFields), articleController.createArticle);
router.put('/:id', adminMiddleware, upload.fields(inputFields), articleController.updateArticle);
router.delete('/:id', adminMiddleware, articleController.deleteArticle);

module.exports = router;
