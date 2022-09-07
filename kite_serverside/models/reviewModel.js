const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      trim: true,
      maxLength: [
        500,
        'Description must have less of equal than 500 characters',
      ],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: { type: Date, default: Date.now() },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      required: [true, 'Review must belong to a book'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullName photo email',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
