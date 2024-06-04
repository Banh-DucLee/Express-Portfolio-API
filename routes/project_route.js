const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth_middlaware');
const { upload, processImage } = require('../middlewares/upload_middleware');
const projectCtrl = require('../controllers/project_controller');

router.get('/', projectCtrl.getAll);
router.get('/:id', projectCtrl.getProject);
router.post('/', auth, upload.single('image'), processImage, projectCtrl.create);
router.put('/:id', auth, upload.single('image'), processImage, projectCtrl.modify);
router.delete('/:id', auth, projectCtrl.delete);

module.exports = router;