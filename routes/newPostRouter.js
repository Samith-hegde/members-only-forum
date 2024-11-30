const express = require('express');
const router = express.Router();
const { newPostForm, createPost } = require('../controllers/newPostController');

router.get('/', newPostForm);
router.post('/', createPost);

module.exports = router;
