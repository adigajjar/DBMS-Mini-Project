const express = require('express');
const blogController = require('../controllers/blog_post');
const router = express.Router();

router.post('/submit', blogController.submit);
router.post('/addComment', blogController.addComment);
router.post('/addFavorite', blogController.addFavorite);

module.exports = router;