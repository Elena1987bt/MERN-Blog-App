const multer = require('multer');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');

// CONFIGURATION OF MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadError = new AppError(
      'Not an image! Please upload only images.',
      400
    );
    if (file.mimetype.startsWith('image')) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name || file.originalname);
  },
});

exports.uploadOptions = multer({ storage: storage });

exports.getUploads = async (req, res, next) => {
  const file = req.file;
  if (!file) return next(new AppError('No image found in the request', 404));
  // console.log(file);
  res.status(200).json({
    status: 'success',
    message: 'Image successfully uploaded',
  });
};

exports.getAllPosts = async (req, res, next) => {
  console.log(req.query.username);
  const username = req.query.username;
  const categoryName = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categoryName) {
      posts = await Post.find({
        categories: {
          $in: [categoryName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json({
      status: 'success',
      results: posts.length,
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    post.save();

    res.status(200).json({ status: 'success', post: post });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError('No post found with that ID', 404));

    res.status(200).json({ status: 'success', post: post });
  } catch (err) {
    next(err);
  }
};
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }
    if (req.body.username === post.username) {
      const newPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json({ status: 'success', post: newPost });
    } else {
      return next(new AppError('You can update only your post', 401));
    }
  } catch (err) {
    next(err);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }
    if (req.body.username === post.username) {
      await post.delete();

      res.status(200).json({
        status: 'success',
        data: null,
        message: 'Post has been deleted',
      });
    } else {
      return next(new AppError('You can delete only your post', 401));
    }
  } catch (err) {
    next(err);
  }
};
