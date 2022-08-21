const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Book Name is required'],
      trim: true,
      maxLength: [80, 'Description must have less of equal than 80 characters'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Book must belong to a user!'],
    },
    createdAt: { type: Date, default: Date.now() },
    bookFile: String,
    bookCover: String,
    bookCoverPublicId: String,
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
      maxLength: [1000, 'Summary must have less of equal than 1000 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxLength: [
        150,
        'Description must have less of equal than 150 characters',
      ],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    approvingStatus: {
      type: Boolean,
      default: false,
    },
    approvedReason: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tag',
        required: [true, 'Book must have some tags'],
      },
    ],
    publicationDate: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: '_id fullName email',
  }).populate({
    path: 'tags',
    select: '-__v',
  });
  next(0);
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
