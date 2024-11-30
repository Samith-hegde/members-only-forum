const express = require('express');
const router = express.Router();
const { clubMemberForm, updateMembership } = require('../controllers/clubMemberController');

router.get('/', clubMemberForm);
router.post('/', updateMembership);

module.exports = router;