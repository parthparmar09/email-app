const User = require("../models/userModel");

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};

module.exports = { getUser, updateUser, deleteUser };
