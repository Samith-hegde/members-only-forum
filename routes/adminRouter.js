const express = require('express');
const router = express.Router();
const { adminForm, updateIsAdmin } = require('../controllers/adminController');

router.get('/', adminForm);
router.post('/', updateIsAdmin);

module.exports = router;