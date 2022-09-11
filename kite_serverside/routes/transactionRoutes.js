const express = require('express');
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-success',
  transactionController.createTransactionCheckout
);

router.get(
  '/checkout-session/:bookId',
  authController.protect,
  transactionController.getCheckoutSession
);

router.get(
  '/',
  authController.protect,
  authController.restrictTo('manager'),
  transactionController.getAllTransactions
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('manager'),
  transactionController.deleteTransaction
);

router.get(
  '/isOwnBook/:id',
  authController.protect,
  transactionController.getTransactionOfBook
);

router.get(
  '/myInventory',
  authController.protect,
  transactionController.getUserSuccessTransaction
);

module.exports = router;
