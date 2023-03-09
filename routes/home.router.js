const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.getHomepage);

module.exports = router;

// app.get('/', async (req, res) => {
//     res.send('Hello World');
// });