const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', authController.register);

/**
 * @openapi
 * /http/api/users/login:
 *   post:
 *     summary: Login user to get the bearer token for authorization
 *     tags:
 *      - Authentication
 *     parameters:
 *      - in: header
 *        name: Content-Type
 *        required: true
 *        schema:
 *         type: string
 *         default: application/json
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *             format: email
 *            password:
 *             type: string
 *             format: password
 *          required:
 *            - email
 *            - password
 *          example:
 *            email: me@example.com
 *            password: myPassword@123
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Internal Server Error
 *      401:
 *        description: Unauthorized
 */
router.post('/login', authController.login);

router.post(
  '/googleLogin',
  authController.googleLoginAccount,
  authController.googleLoginSession
);

router.get('/logout', authController.protect, authController.logoutSession);

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
