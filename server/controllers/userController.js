const User = require("../models/userModel");
const { sendSuccess } = require("../utils/helperFunctions");
const MyError = require("../errors/MyError");

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new MyError(404, "User not found");
  }

  res.json(user);
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  if (!user) {
    throw new MyError(404, "User not found");
  }

  res.json(user);
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new MyError(404, "User not found");
  }

  sendSuccess(res, "Account Deleted");
};

module.exports = { getUser, updateUser, deleteUser };
