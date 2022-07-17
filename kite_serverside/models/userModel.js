const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['customer', 'manager', 'admin'],
    default: 'customer',
  },
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true,
    maxLength: [40, 'Full name must have less of equal than 40 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    validate: {
      validator: (str) => validator.isStrongPassword(str, { minSymbols: 0 }),
      message:
        'Password must have more than 8 characters, contains at least 1 uppercase letter and 1 number',
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  address: {
    type: String,
    trim: true,
    minLength: [5, 'Address must be at least 5 characters long'],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(v);
      },
      message: 'Phone number is not valid!',
    },
  },
  zipCode: {
    type: String,
    minLength: [5, 'Zip Code is not valid!'],
    maxLength: [6, 'Zip Code is not valid!'],
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    values: [('male', 'female')],
    default: 'male',
  },
  state: {
    type: String,
    trim: true,
    minLength: [5, 'State must be at least 5 characters long'],
  },
  city: {
    type: String,
    trim: true,
    minLength: [5, 'City must be at least 5 characters long'],
  },
  region: {
    type: String,
    trim: true,
    minLength: [4, 'Region must be at least 4 characters long'],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

//password encryption (between get data and persisted to dtb)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

//check password login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
