const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//photo buffer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  }
  if (file.mimetype.startsWith('image/gif')) {
    cb(
      new AppError(
        'Animated .gif image is not supported! Please upload another image',
        400
      ),
      false
    );
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

exports.handlingUploadFile = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
}).single('photo');

//upload photos
exports.uploadUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${req.user.email}`;

  const uploadToCloudinary = (fileBuffer) =>
    new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: 'UserPhotos',
            public_id: req.file.filename,
            width: 500,
            height: 500,
            gravity: 'faces',
            crop: 'thumb',
            quality: 90,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(fileBuffer);
    });

  const uploadResult = await uploadToCloudinary(req.file.buffer);
  req.profileImageUrl = uploadResult.url;

  next();
});

//user data
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMyInfo = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  if (req.body.email) {
    return next(
      new AppError(
        'This route is not for email updates. Please use /updateMyEmail.',
        400
      )
    );
  }

  const filteredBody = filterObj(
    req.body,
    'fullName',
    'gender',
    'dateOfBirth',
    'phoneNumber',
    'country',
    'address',
    'city',
    'zipCode',
    'specialization'
  );
  if (req.file) filteredBody.photo = req.profileImageUrl;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

//deactivate account
exports.deactivateAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'none',
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', 'loggedout', cookieOptions);

  res.status(200).json({
    status: 'success',
    message: 'User account is deactivated successfully!',
  });
});
