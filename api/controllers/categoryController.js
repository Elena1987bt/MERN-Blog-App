const Category = require('../models/categoryModel');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      results: categories.length,
      categories: categories,
    });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    newCategory.save();

    res.status(200).json({ status: 'success', category: newCategory });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
