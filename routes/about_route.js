const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth_middlaware');
const { upload, processImage } = require('../middlewares/upload_middleware');
const aboutCtrl = require('../controllers/about_controller');

router.get('/', aboutCtrl.getAbout);
router.post('/', auth, upload.single('image'), processImage, aboutCtrl.create);
router.put('/:id', auth, upload.single('image'), processImage, aboutCtrl.modify);

module.exports = router;