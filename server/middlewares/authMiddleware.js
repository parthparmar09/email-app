const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new MyError(StatusCodes.UNAUTHORIZED, "Token Not Found");
  }
  if (!token.startsWith("Bearer")) {
    throw new MyError(StatusCodes.UNAUTHORIZED, "Invalid Token");
  }

  const payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

  if (!payload) {
    throw new MyError(StatusCodes.UNAUTHORIZED, "Invalid Token");
  }

  req.user = payload;
  next();
};

module.exports = { authenticate };
