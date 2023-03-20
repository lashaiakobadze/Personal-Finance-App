const Category = require('../models/categoryModel');
const Record = require('../models/recordModel');

const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createCategory = factory.createOne(Category);

exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  let defaultCategory = await Category.findOne({
    name: 'default',
    user
  });

  if (!defaultCategory) {
    defaultCategory = new Category({ name: 'default', user });
    await defaultCategory.save();
  }

  const records = await Record.find({ category: id });
  if (defaultCategory && records.length) {
    await Record.updateMany(
      { category: id },
      { category: defaultCategory._id }
    );
  } else if (defaultCategory) {
    await Category.findByIdAndDelete(id);
  } else {
    return res
      .status(500)
      .send("Server error: Default Category doesn't exist yet");
  }
  res.send('Category deleted');
});
