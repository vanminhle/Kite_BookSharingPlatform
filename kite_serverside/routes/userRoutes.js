const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.post('/sendEmailVerification', authController.sendEmailVerification);
router.get('/emailVerify/:verifyToken', authController.emailVerification);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

//test route
router.get('/test', authController.protect, authController.test);
router.delete(
  '/deleteTest',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  authController.deleteTest
);

module.exports = router;
