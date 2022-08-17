const express = require('express');
const authController = require('../controllers/authController');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.post(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  tagController.createTag
);

router.get('/', tagController.getAllTags);

router.get('/:id', tagController.getTag);

router.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  tagController.updateTag
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  tagController.deleteTag
);

module.exports = router;
