const multer = require('multer');
const fs = require('fs');
const {
  coverToCloudinary,
  deleteFromCloudinary,
} = require('../utils/cloudinary');
const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const filterObj = require('../utils/apiObjectFilter');
const Email = require('../utils/email');

//file buffer
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jfif' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/pjpeg' ||
    file.mimetype === 'image/pjp'
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not valid files! Please upload images for Book Cover and pdf for Book',
        400
      ),
      false
    );
  }
};

exports.handlingUploadFile = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
}).fields([
  { name: 'bookFile', maxCount: 1 },
  { name: 'bookCover', maxCount: 1 },
]);

//handling old data when update book
exports.handingBookEdited = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return next(new AppError('Book does not exist! Please try again', 404));
  if (req.user.role !== 'admin' && book.approvingStatus === 'approved')
    return next(
      new AppError(
        'Your book has been published! You need to submit a support request if you want to editing published book',
        403
      )
    );
  if (!req.files.bookCover || !req.files.bookFile)
    next(new AppError('Book cover and Book Document File is Required!', 400));

  if (req.files.bookCover && req.files.bookFile) {
    await deleteFromCloudinary(book.bookCoverPublicId);
    await fs.unlink(`public/booksDocument/${book.bookFile}`, (err) => {
      if (err)
        next(
          new AppError(
            'Problem when try to editing Book. Please try again!',
            409
          )
        );
    });
    req.bookAuthor = book.author._id;
    req.bookAuthorEmail = book.author.email;
    req.bookEdited = true;
    next();
  }
});

//upload and save book file
exports.uploadAndSave = catchAsync(async (req, res, next) => {
  if (!req.files.bookCover && !req.files.bookFile)
    next(new AppError('Book cover and Book Document File is Required!', 400));
  if (!req.files.bookCover && !req.files.bookFile)
    next(new AppError('Book cover and Book Document File is Required!', 400));

  const book = await Book.findOne({
    bookTitle: req.body.bookTitle,
    author: req.bookEdited ? req.bookAuthor : req.user._id,
  });
  if (book)
    next(
      new AppError('Name of the book is duplicate with your another book!', 400)
    );

  //

  req.files.bookCover[0].filename = `bookCover-${req.body.bookTitle
    .split(' ')
    .join('')}-${req.bookEdited ? req.bookAuthorEmail : req.user.email}`;

  const uploadResult = await coverToCloudinary(
    req.files.bookCover[0].buffer,
    req.files.bookCover[0].filename
  );

  req.bookCoverUrl = uploadResult.secure_url;
  req.bookCoverPublicId = uploadResult.public_id;

  //

  req.files.bookFile[0].filename = `bookFile-${req.body.bookTitle
    .split(' ')
    .join('')}-${req.bookEdited ? req.bookAuthorEmail : req.user.email}`;

  fs.writeFile(
    `public/booksDocument/${req.files.bookFile[0].filename}.pdf`,
    req.files.bookFile[0].buffer,
    (err) => {
      if (err)
        next(new AppError(`Problem when upload book! Please try again`, 400));
    }
  );
  req.bookFileString = `${req.files.bookFile[0].filename}.pdf`;

  next();
});

//Crud book
exports.submitBook = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'price',
    'summary',
    'description',
    'tags'
  );
  filteredBody.author = req.user._id;
  filteredBody.bookTitle = req.body.bookTitle
    .split(' ')
    .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(' ');

  filteredBody.bookFile = req.bookFileString;
  filteredBody.bookCover = req.bookCoverUrl;
  filteredBody.bookCoverPublicId = req.bookCoverPublicId;

  const newBook = await Book.create(filteredBody);

  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  let totalData;
  if (req.user.role === 'customer') {
    totalData = new APIFeatures(Book.countDocuments(), req.query)
      .filter()
      .countFilter();
  } else {
    totalData = new APIFeatures(Book.countDocuments(), req.query).countFilter();
  }
  const results = await totalData.query;
  const numOfPagesResults = results / req.query.limit;

  //get filter data
  const data = new APIFeatures(Book.find().populate('tags'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const books = await data.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: results,
    resultsPage: Math.ceil(numOfPagesResults),
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError('No book found with that ID!', 404));

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.getBookFile = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) return next(new AppError('No book found with that ID!', 404));

  await fs.readFile(`public/booksDocument/${book.bookFile}`, (err, data) => {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=${book.bookFile}`,
    });
    res.send(data);
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'price',
    'summary',
    'description',
    'tags'
  );
  filteredBody.bookTitle = req.body.bookTitle
    .split(' ')
    .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(' ');
  filteredBody.bookFile = req.bookFileString;
  filteredBody.bookCover = req.bookCoverUrl;
  filteredBody.bookCoverPublicId = req.bookCoverPublicId;

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Book updated successfully!',
    data: {
      book: updatedBook,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (
    !book ||
    (req.user.role === 'customer' &&
      req.user._id.equals(book.author._id) === false)
  )
    return next(new AppError('Book does not exist! Please try again', 404));

  if (book.approvingStatus === 'approved' && req.user.role !== 'admin')
    return next(
      new AppError(
        `Book has been published can't be deleted! Submit a ticket for more information!`,
        403
      )
    );

  if (
    req.user.role === 'admin' ||
    (req.user.role === 'customer' && req.user._id.equals(book.author._id))
  ) {
    await Book.findByIdAndDelete(req.params.id);
    await deleteFromCloudinary(book.bookCoverPublicId);
    await fs.unlink(`public/booksDocument/${book.bookFile}`, (err) => {
      if (err)
        next(
          new AppError(
            'Problem when try to deleting Book. Please try again!',
            409
          )
        );
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.setBookStatus = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      approvingStatus: req.body.status,
      approvingReason: req.body.reason,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const url = `http://localhost:3000/my-book`;
  await new Email(book.author, url, book).sendBookApprovingStatus();

  if (!book)
    return next(new AppError('Book does not exist! Please try again', 404));

  res.status(200).json({
    status: 'success',
    message: 'Book approving status set successfully',
    data: {
      book,
    },
  });
});
