const express = require('express');
const router = express.Router();

const selfIntroController = require('../controllers/selfintro.controller');

router.get('/', selfIntroController.getSelfIntro);
router.get('/:id', selfIntroController.getSelfIntroById);
router.post('/', selfIntroController.createSelfIntro);
router.put('/en/:id', selfIntroController.updateSelfIntroEnglishVersion);
router.put('/zh/:id', selfIntroController.updateSelfIntroChineseVersion);
router.delete('/:id', selfIntroController.deleteSelfIntro);

module.exports = router;
