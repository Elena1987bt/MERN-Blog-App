const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'A user must have a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have a email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
