const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    });
    user.save();

    res.status(200).json({ status: 'success', user: user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // 1. Find user by username
    const user = await User.findOne({ username: req.body.username });
    // 2. Check if user exists
    if (!user)
      return next(new AppError('No user found with that username', 404));

    // 3. Check if password match
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        status: 'success',
        message: 'User Authenticated!',
        user: user,
      });
    } else {
      next(new AppError('Wrong password', 404));
    }
  } catch (err) {
    next(err);
  }
};
