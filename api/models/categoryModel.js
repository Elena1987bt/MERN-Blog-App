const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
