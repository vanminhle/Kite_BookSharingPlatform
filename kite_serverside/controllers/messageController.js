const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.newMessageConversation = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newMessage,
    },
  });
});

exports.getMessageConversation = catchAsync(async (req, res, next) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      messages,
    },
  });
});
