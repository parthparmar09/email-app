const jwt = require("jsonwebtoken");
require("dotenv").config();

const sendSuccess = (res, message, data) => {
  res.status(200).json({ success: true, message, data });
};

const createJwt = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports = { sendSuccess, createJwt };
