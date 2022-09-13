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
    // successRedirect: 'http://localhost:3000/authentication',
    failureRedirect: `http://localhost:3000/authentication`,
  }),
  authController.googleLogin
);

router.get('/logout', authController.protect, authController.logoutSession);

//account information
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

router.patch(
  '/deactivateAccount',
  authController.protect,
  userController.deactivateAccount
);

//account recovery
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.post('/sendEmailVerification', authController.sendEmailVerification);
router.get('/emailVerify/:verifyToken', authController.emailVerification);

//user management
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers
);

router.get('/:id', authController.protect, userController.getUser);

router.patch(
  '/setAccountStatus/:id',
  authController.protect,
  authController.restrictTo('admin'),
  userController.setAccountStatus
);

router.patch(
  '/setAccountRole/:id',
  authController.protect,
  authController.restrictTo('admin'),
  userController.setAccountRole
);

module.exports = router;
