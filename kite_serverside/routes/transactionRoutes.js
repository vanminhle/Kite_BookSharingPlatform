const express = require('express');
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:bookId',
  authController.protect,
  transactionController.getCheckoutSession
);

module.exports = router;
