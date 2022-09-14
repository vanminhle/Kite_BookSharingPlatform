const express = require('express');
const authController = require('../controllers/authController');
const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.post(
  '/',
  authController.protect,
  authController.restrictTo('customer'),
  conversationController.createConversation
);

router.get(
  '/:userId',
  authController.protect,
  authController.restrictTo('customer', 'manager'),
  conversationController.getConversation
);

module.exports = router;
