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
  authController.restrictTo('admin', 'manager'),
  statisticsController.booksStatistics
);

router.get(
  '/booksUploadedMonthly',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  statisticsController.booksUploadedMonthly
);

router.get(
  '/booksSoldMonthly',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  statisticsController.booksSoldMonthly
);

router.get(
  '/topFiveBooksSales',
  authController.protect,
  authController.restrictTo('manager'),
  statisticsController.topFiveBooksSales
);

router.get(
  '/topFiveBooksRevenue',
  authController.protect,
  authController.restrictTo('manager'),
  statisticsController.topFiveBooksRevenue
);

router.get(
  '/totalRevenueMonthly',
  authController.protect,
  authController.restrictTo('manager'),
  statisticsController.totalRevenueMonthly
);

module.exports = router;
