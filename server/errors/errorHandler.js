const MyError = require("./MyError");

//not found fall back - if none of the endpoints gets hit , control goes here
const notFound = (req, res, next) => {
  next(new MyError(404, "Page Not Found"));
};

//the final global error handler - any error thrown from any part of the app, gets caught here
const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message;

  if (err.statusCode !== 404) {
    console.log(err);
  }

  if (message === "jwt malformed" || message === "jwt expired") {
    status = 401;
    message = "Please Login";
  }

  if (err.code === 11000) {
    message = "Email already exists";
  }

  if (message.includes(":")) {
    const arr = message.split(":");
    message = arr[arr.length - 1].trim();
  }

  res.status(status).json({ success: false, message });
};

module.exports = { notFound, errorHandler };
