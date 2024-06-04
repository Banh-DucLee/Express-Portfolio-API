const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth_middlaware');
const contactCtrl = require('../controllers/contact_controller');

router.get('/', auth, contactCtrl.getAll);
router.get('/:id', auth, contactCtrl.getContact);
router.post('/', contactCtrl.create);
router.delete('/:id', auth, contactCtrl.delete);

module.exports = router;