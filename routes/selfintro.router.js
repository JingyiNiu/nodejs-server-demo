const express = require('express');
const router = express.Router();
const multer = require('multer');
const selfIntroController = require('../controllers/selfintro.controller');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', selfIntroController.getSelfIntro);
router.get('/:id', selfIntroController.getSelfIntroById);

router.get('/admin', adminMiddleware, selfIntroController.getSelfIntro);
router.get('/admin/:id', adminMiddleware, selfIntroController.getSelfIntroById);

router.post('/', adminMiddleware, selfIntroController.createSelfIntro);
router.put('/en/:id', adminMiddleware, selfIntroController.updateSelfIntroEnglishVersion);
router.put('/zh/:id', adminMiddleware, selfIntroController.updateSelfIntroChineseVersion);
router.delete('/:id', adminMiddleware, selfIntroController.deleteSelfIntro);

module.exports = router;
