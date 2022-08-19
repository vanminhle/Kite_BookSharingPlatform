const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag Name cannot be empty'],
    trim: true,
    maxLength: [20, 'Description must have less of equal than 20 characters'],
  },
  group: {
    type: String,
    required: [true, 'Tag Group cannot be empty'],
    enum: {
      values: ['format', 'content', 'genre', 'theme'],
      message: 'Tag Group should defined by (format, content, theme, genre)',
    },
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty'],
    trim: true,
    maxLength: [60, 'Description must have less of equal than 60 characters'],
  },
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
