const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name."],
    min: [3, "Your name must be greater than 3 characters."],
    max: [20, "Your name must be lesser than 20 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minLength: 8,
    select: false,
  },
  images: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

module.exports = User;
