const sendSuccess = (res, message, data) => {
  res.status(200).json({ success: true, message, data });
};

module.exports = { sendSuccess };
