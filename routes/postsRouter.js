const express = require('express');
const router = express.Router();
const { viewAllPosts } = require('../controllers/postsController');

router.get('/', viewAllPosts);

module.exports = router;