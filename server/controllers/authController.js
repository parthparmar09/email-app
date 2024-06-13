const User = require("../models/userModel.js");
const { sendSuccess, createJwt } = require("../utils/helperFunctions");
const MyError = require("../errors/MyError");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new MyError(400, "User already exists");
  }

  const newUser = new User({ username, email, password });
  await newUser.save();

  const token = createJwt(newUser._id);

  sendSuccess(res, "Signed up", { token, newUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new MyError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new MyError(401, "Invalid email or password");
  }

  const token = createJwt(user._id);

  sendSuccess(res, "Logged in", { token, user });
};

module.exports = { signup, login };

//666a8f1a53704f3458b29a1a
//666a8f3d61b0e48b0c96163a
//666a8f5361b0e48b0c96163d
//666a8f6461b0e48b0c961640
//666a95529a507f82b10b7bbe
