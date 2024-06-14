const jwt = require("jsonwebtoken");
const MyError = require("../errors/MyError");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new MyError(401, "Token Not Found");
  }
  if (!token.startsWith("Bearer")) {
    throw new MyError(401, "Invalid Token");
  }

  const payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

  if (!payload) {
    throw new MyError(401, "Invalid Token");
  }

  req.user = payload;
  next();
};

module.exports = { authenticate };
