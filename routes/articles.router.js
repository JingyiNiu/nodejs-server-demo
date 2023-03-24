const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getOneArticle);

module.exports = router;
