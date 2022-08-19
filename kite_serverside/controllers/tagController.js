const Tag = require('../models/tagModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findOne({ name: req.body.name });
  if (tag) return next(new AppError('Tag is already exists!', 409));

  const newTag = await Tag.create({
    name: req.body.name,
    group: req.body.group,
    description: req.body.description,
  });

  res.status(201).json({
    status: 'success',
    data: {
      tag: newTag,
    },
  });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
  const totalData = new APIFeatures(
    Tag.countDocuments(),
    req.query
  ).countFilter();
  const results = await totalData.query;
  const numOfPagesResults = results / 30;

  //get filter data
  const data = new APIFeatures(Tag.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tags = await data.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: results,
    resultsPage: Math.ceil(numOfPagesResults),
    data: {
      tags,
    },
  });
});

exports.getTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new AppError('No tag found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tag,
    },
  });
});

exports.updateTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findOne({ name: req.body.name });
  if (tag)
    return next(
      new AppError('That tag name is already used by another tag', 409)
    );

  const tagUpdated = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tagUpdated) {
    return next(new AppError('No tag found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tagUpdated,
    },
  });
});

exports.deleteTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findByIdAndDelete(req.params.id);

  if (!tag) {
    return next(new AppError('No tag found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
