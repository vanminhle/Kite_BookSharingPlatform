const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, reviewController.getAllReviews);

router.post(
  '/',
  authController.protect,
  authController.restrictTo('customer'),
  reviewController.createReview
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('manager', 'customer'),
  reviewController.deleteReview
);

module.exports = router;
