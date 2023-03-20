const Record = require('../models/recordModel');
const Category = require('../models/categoryModel');

const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

/**
 * can't use: @desc {exports.createRecord = factory.createOne(Record);} such createCategory
 * because we need default category id instead name,
 * but if we make this with name, we can set default name in CategorySchema.
 * But i think id is better way than name, id should by dynamic.
 */
exports.createRecord = catchAsync(async (req, res) => {
  const { category, description, amount, type, user } = req.body;

  const defaultCategory = await Category.findOne({
    name: 'default',
    user
  });

  const record = new Record({
    category: category || defaultCategory._id,
    description,
    amount,
    type,
    user
  });

  await record.save();
  res.status(201).json(record);
});

exports.updateRecord = factory.updateOne(Record);

exports.getAllRecords = factory.getAll(Record);
