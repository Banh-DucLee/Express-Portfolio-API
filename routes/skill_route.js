const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth_middlaware');
const { upload, processImage } = require('../middlewares/upload_middleware');
const skillCtrl = require('../controllers/skill_controller');

router.get('/', skillCtrl.getAll);
router.post('/', auth, upload.single('image'), processImage, skillCtrl.create);
router.put('/:id', auth, upload.single('image'), processImage, skillCtrl.modify);
router.delete('/:id', auth, skillCtrl.delete);

module.exports = router;