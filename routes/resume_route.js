const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../middlewares/auth_middlaware');
const resumeCtrl = require('../controllers/resume_controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

router.get('/', resumeCtrl.downloadResume);
router.post('/',auth, upload.single('resume'), resumeCtrl.updateResume);

module.exports = router;
