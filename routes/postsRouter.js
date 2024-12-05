const express = require('express');
const router = express.Router();
const { viewAllPosts, deletePost } = require('../controllers/postsController');

router.get('/', viewAllPosts);
router.post('/deletePost', deletePost);

module.exports = router;