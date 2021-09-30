const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');

// UPDATE
exports.updateUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 12);
      }
      const newUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({ status: 'success', user: newUser });
    } catch (err) {
      next(err);
    }
  } else {
    next(new AppError('You can update only your account', 401));
  }
};

// DELETE
exports.deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next(new AppError('No user with that ID', 401));

      // Delete posts from the user
      await Post.deleteMany({ username: user.username });

      // Delete user
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: 'success',
        data: null,
        message: 'User has been deleted successfully!',
      });
    } catch (err) {
      next(err);
    }
  } else {
    next(new AppError('You can delete only your account', 401));
  }
};

// GET USER
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ status: 'success', user: others });
  } catch (err) {
    next(err);
  }
};
