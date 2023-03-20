const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Record must belong to a Category.']
  },
  description: {
    type: String,
    required: [true, 'A record must have a description'],
    index: true
  },
  amount: {
    type: Number,
    required: [true, 'A record must have a amount']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'A record must have a type']
  },
  status: {
    type: String,
    enum: ['processing', 'completed'],
    default: 'processing'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Record must belong to a user.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
