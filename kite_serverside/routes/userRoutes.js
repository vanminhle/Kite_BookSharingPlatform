const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    session: false,
    // successRedirect:
    //   process.env.NODE_ENV !== 'production' &&
    //   `${process.env.CLIENT_URL_DEVELOPMENT}/authentication`,
    //successMessage: 'Login successful',
    failureMessage: 'Cannot login to Google, Please try again later!',
  }),
  authController.googleLogin
);

router.patch(
  '/updateMyInfo',
  authController.protect,
  userController.handlingUploadFile,
  userController.uploadUserPhoto,
  userController.updateMyInfo
);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMyEmail',
  authController.protect,
  authController.UpdateEmail
);

router.put(
  '/deactivateAccount',
  authController.protect,
  userController.deactivateAccount
);

router.get('/logout', authController.protect, authController.logoutSession);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.post('/sendEmailVerification', authController.sendEmailVerification);
router.get('/emailVerify/:verifyToken', authController.emailVerification);

//test route
router.get('/test', authController.protect, authController.test);
router.delete(
  '/deleteTest',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  authController.deleteTest
);

module.exports = router;
