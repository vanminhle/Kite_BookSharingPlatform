const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, 'Book Title is required'],
      trim: true,
      maxLength: [70, 'Description must have less of equal than 70 characters'],
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
      maxLength: [150, 'Summary must have less of equal than 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxLength: [
        600,
        'Description must have less of equal than 600 characters',
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
      type: String,
      default: 'pending',
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: 'Book status must be approved or rejected',
      },
    },
    approvingReason: {
      trim: true,
      type: String,
      maxLength: [
        36,
        'Approving Reason must have less of equal than 36 characters',
      ],
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
    select: '-_v',
  });
  next(0);
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
