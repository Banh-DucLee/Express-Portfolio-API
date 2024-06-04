const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth_middlaware');
const { upload, processImage } = require('../middlewares/upload_middleware');
const socialCtrl = require('../controllers/social_controller');

router.get('/', socialCtrl.getAll);
router.get('/:id', socialCtrl.getSocial);
router.post('/', auth, upload.single('image'), processImage, socialCtrl.create);
router.delete('/:id', auth, socialCtrl.delete);

module.exports = router;