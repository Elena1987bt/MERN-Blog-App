const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);
router
  .route('/:id')
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

router.post(
  '/uploads',
  postController.uploadOptions.single('file'),
  postController.getUploads
);

module.exports = router;
