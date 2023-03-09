const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

router.get('/', articleController.getAllArticles);

module.exports = router;

// app.get('/api/articles', async (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         data: [
//             {
//                 id: 1,
//                 title: 'Hi',
//             },
//             {
//                 id: 2,
//                 title: 'Hello',
//             },
//         ],
//     });
// });