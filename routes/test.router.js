const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');



router.get('/articles',  testController.getArticles);

module.exports = router;
