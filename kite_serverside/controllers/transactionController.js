const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);

  //2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/books/${book._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.bookId,
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: book.price * 100, //*amount is calculated by cents (1$ = 100 cents)
          product_data: {
            name: book.bookTitle,
            description: book.summary,
            images: [book.bookCover],
          },
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});
