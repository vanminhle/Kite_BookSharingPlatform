const express = require('express');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post(
  '/',
  authController.protect,
  authController.restrictTo('customer'),
  bookController.handlingUploadFile,
  bookController.uploadAndSave,
  bookController.submitBook
);

router.get('/', authController.protect, bookController.getAllBooks);

router.get('/:id', authController.protect, bookController.getBook);

router.get('/reading/:id', authController.protect, bookController.getBookFile);

router.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('admin', 'customer'),
  bookController.handlingUploadFile,
  bookController.handingBookEdited,
  bookController.uploadAndSave,
  bookController.updateBook
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  bookController.deleteBook
);

router.patch(
  '/setBookStatus/:id',
  authController.protect,
  authController.restrictTo('manager'),
  bookController.setBookStatus
);

module.exports = router;
