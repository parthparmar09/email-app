const Email = require("../models/emailModel");

const sendEmail = async (req, res, next) => {
  const { senderId, recipientIds, ccIds, bccIds, subject, body, attachments } =
    req.body;

  const newEmail = new Email({
    senderId,
    recipientIds,
    ccIds,
    bccIds,
    subject,
    body,
    attachments,
  });
  await newEmail.save();

  res.status(201).json({ message: "Email sent successfully" });
};

const getInbox = async (req, res, next) => {
  const userId = req.user._id;

  const inboxEmails = await Email.find({
    recipientIds: userId,
    isDraft: false,
  });
  res.json(inboxEmails);
};

const getSent = async (req, res, next) => {
  const userId = req.user._id;

  const sentEmails = await Email.find({ senderId: userId, isDraft: false });
  res.json(sentEmails);
};

const getDrafts = async (req, res, next) => {
  const userId = req.user._id;

  const draftEmails = await Email.find({ senderId: userId, isDraft: true });
  res.json(draftEmails);
};

const updateEmail = async (req, res, next) => {
  const emailId = req.params.id;
  const updateData = req.body;

  const updatedEmail = await Email.findByIdAndUpdate(emailId, updateData, {
    new: true,
  });
  if (!updatedEmail) {
    return res.status(404).json({ message: "Email not found" });
  }

  res.json(updatedEmail);
};

const deleteEmail = async (req, res, next) => {
  const emailId = req.params.id;

  const deletedEmail = await Email.findByIdAndDelete(emailId);
  if (!deletedEmail) {
    return res.status(404).json({ message: "Email not found" });
  }

  res.json({ message: "Email deleted successfully" });
};

module.exports = {
  sendEmail,
  getInbox,
  getSent,
  getDrafts,
  updateEmail,
  deleteEmail,
};
