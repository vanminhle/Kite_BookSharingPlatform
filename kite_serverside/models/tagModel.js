const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag Name is required'],
    trim: true,
    maxLength: [20, 'Tag Name must have less of equal than 20 characters'],
  },
  group: {
    type: String,
    required: [true, 'Tag Group is required'],
    enum: {
      values: ['format', 'content', 'genre', 'theme'],
      message: 'Tag Group should defined by (format, content, theme, genre)',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [100, 'Description must have less of equal than 100 characters'],
  },
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
