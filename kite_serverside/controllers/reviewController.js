const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');
const Transaction = require('../models/transactionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().populate({
    path: 'book',
    select: 'bookTitle author -tags',
  });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const userTransaction = await Transaction.find({
    user: req.user._id,
    book: req.body.book,
  });
  if (userTransaction.length === 0) {
    return next(
      new AppError('You need to buy this book before review it!', 404)
    );
  }

  const userReview = await Review.find({
    user: req.user._id,
    book: req.body.book,
  });
  if (userReview.length !== 0) {
    return next(new AppError('You have already reviewed this book!', 404));
  }

  const newReview = await Review.create({ ...req.body, user: req.user._id });

  res.status(201).json({ status: 'success', data: newReview });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (
    !review ||
    (req.user.role === 'customer' &&
      req.user._id.equals(review.user._id) === false)
  )
    return next(new AppError('Review does not exist! Please try again', 404));

  if (
    req.user.role === 'manager' ||
    (req.user.role === 'customer' && req.user._id.equals(review.user._id))
  ) {
    await Review.findByIdAndDelete(req.params.id);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
