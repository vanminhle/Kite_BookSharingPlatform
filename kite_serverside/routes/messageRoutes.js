const express = require('express');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post(
  '/',
  authController.protect,
  authController.restrictTo('customer', 'manager'),
  messageController.newMessageConversation
);

router.get(
  '/:conversationId',
  authController.protect,
  authController.restrictTo('customer', 'manager'),
  messageController.getMessageConversation
);

module.exports = router;
