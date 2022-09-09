const express = require('express');
const statisticsController = require('../controllers/statisticsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/accounts',
  authController.protect,
  authController.restrictTo('admin'),
  statisticsController.accountsStatistics
);

router.get(
  '/accountsCreatedYearly',
  authController.protect,
  authController.restrictTo('admin'),
  statisticsController.accountsCreatedYearly
);

router.get(
  '/books',
  authController.protect,
  authController.restrictTo('admin'),
  statisticsController.booksStatistics
);

router.get(
  '/booksUploadedMonthly',
  authController.protect,
  authController.restrictTo('admin'),
  statisticsController.booksUploadedMonthly
);

router.get(
  '/booksSoldMonthly',
  authController.protect,
  authController.restrictTo('admin'),
  statisticsController.booksSoldMonthly
);

module.exports = router;
