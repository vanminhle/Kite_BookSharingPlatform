const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const createToken = (payload) => {
  const token = jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendVerificationRequest = async (req, res, next, user) => {
  const verifyToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  try {
    const verifyURL = `${req.protocol}://${req.get(
      'host'
    )}/http/api/users/emailVerify/${verifyToken}`;
    await new Email(user, verifyURL).sendVerificationEmail();

    res.status(200).json({
      status: 'success',
      message: 'Verification email have been sent to your email address!',
    });
  } catch (err) {
    user.emailVerificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error when sending the verification email. Try again later!'
      ),
      500
    );
  }
};

//FUNCTIONALITY
exports.register = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return next(new AppError('User is already registered!', 409));

  const newUser = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    zipCode: req.body.zipCode,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    state: req.body.state,
    city: req.body.city,
    region: req.body.region,
    role: req.body.role,
  });

  createSendVerificationRequest(req, res, next, newUser);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide your email and password!', 400));

  const user = await User.findOne({ email }).select('+password');

  if (
    !user ||
    !(await user.correctPassword(password, user.password)) ||
    user.isConfirmed === false
  ) {
    return next(new AppError('Incorrect Email or Password!', 401));
  }

  const token = createToken(user._id);

  //sendCookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.createdAt = undefined;
  user.__v = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

//protected routes
exports.protect = catchAsync(async (req, res, next) => {
  //check token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in!. Please login to get access', 401)
    );
  }

  //verify token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  //Check user
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  req.user = currentUser;
  next();
});

//role restricted
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };

//forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // Generate the random reset token and send it to the user email
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  let resetURL = '';
  if (process.env.NODE_ENV === 'development') {
    resetURL = `http://localhost:3000/reset-password/${resetToken}`;
  } else if (process.env.NODE_ENV === 'production') {
    resetURL = `http://localhost:3000/reset-password/${resetToken}`;
  }

  try {
    // const resetURLLocal = `${req.protocol}://${req.get(
    //   'host'
    // )}/http/api/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Password reset token have been sent to your email address!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error when sending the email. Try again later!'
      ),
      500
    );
  }
});

//reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  //Encrypt, get user
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // Check reset token, set new password
  if (!user) {
    return next(
      new AppError('Password reset token is invalid or has expired', 400)
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message:
      'Your account password has been reset! Please login with your new password',
  });
});

//send email verification
exports.sendEmailVerification = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  //console.log(user);
  if (user && user.isConfirmed) {
    return res.status(200).json({
      status: 'success',
    });
  }

  if (!user) {
    return next(
      new AppError(
        'There is no user account with that email need to be verified!',
        404
      )
    );
  }

  createSendVerificationRequest(req, res, next, user);
});

//email verification
exports.emailVerification = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.verifyToken)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    return next(new AppError('Verification Token is invalid!', 400));
  }
  user.isConfirmed = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  //ENVIRONMENT
  let redirectUrl = '';
  if (process.env.NODE_ENV === 'development') {
    redirectUrl = 'http://localhost:3000/email-verification/success';
  } else if (process.env.NODE_ENV === 'production') {
    redirectUrl = 'http://localhost:3000/email-verification/success';
  }

  res.redirect(301, redirectUrl);
});

//update user password (still have problem in jwt)
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(
      new AppError('Your current password is wrong!. Please try again', 401)
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //should logout user after their account password has been updated
  const token = createToken(user._id);

  res.status(200).json({
    success: true,
    token,
    data: {
      user,
    },
  });
});

//update user email
exports.UpdateEmail = catchAsync(async (req, res, next) => {
  const isExistingEmail = await User.findOne({ email: req.body.email });
  if (isExistingEmail) {
    return next(
      new AppError(
        'That email have been already used by another user or duplicate with the old one in your account',
        401
      )
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      email: req.body.email,
      isConfirmed: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  createSendVerificationRequest(req, res, next, user);
});

//Google oAuth
passport.use(
  new GoogleStrategy(
    {
      callbackURL: `http://localhost:8000/http/api/users/google/redirect`,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userGoogleId = profile.id;
        const userEmail = profile.emails && profile.emails[0].value;
        const userDisplayName = profile.displayName;
        const userPhoto = profile.photos[0].value;
        const userSocialProvider = profile.provider;

        const isExistingUser = await User.findOne({ email: userEmail });
        if (!isExistingUser) {
          const user = new User({
            socialId: userGoogleId,
            email: userEmail,
            fullName: userDisplayName,
            photo: userPhoto,
            socialProvider: userSocialProvider,
            isConfirmed: true,
          });
          await user.save({ validateBeforeSave: false });
          return done(null, user);
        }
        if (isExistingUser) {
          return done(null, isExistingUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

exports.googleLogin = catchAsync(async (req, res, next) => {
  //console.log(req.user);
  if (req.user) {
    const { user } = req;
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  } else {
    return next(
      new AppError('You must be logged in to access this application!')
    );
  }
});

//Microsoft oAuth

//FOR TESTING ONLY
exports.test = function (req, res, next) {
  res.status(200).json({
    status: 'success',
  });
};

exports.deleteTest = function (req, res, next) {
  res.status(200).json({
    status: 'success',
  });
};
