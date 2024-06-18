const Email = require("../models/emailModel");
const { sendSuccess } = require("../utils/helperFunctions");
const MyError = require("../errors/MyError");
const User = require("../models/userModel");

const createEmail = async (req, res) => {
  let { isDraft, recipientIds, ccIds, bccIds, subject, body, attachments } =
    req.body;

  const senderId = req.user._id;

  const allEmailIds = [...recipientIds, ...ccIds, ...bccIds];
  const users = await User.find({ email: { $in: allEmailIds } });

  const emailToIdMap = {};
  const notFoundEmails = [];

  users.forEach((user) => {
    emailToIdMap[user.email] = user._id;
  });

  notFoundEmails.push(...allEmailIds.filter((email) => !emailToIdMap[email]));

  if (notFoundEmails.length === allEmailIds.length) {
    throw new MyError(404, "No users found");
  }

  const mapEmailsToIds = (emails) => emails.map((email) => emailToIdMap[email]);

  recipientIds = mapEmailsToIds(recipientIds);
  ccIds = mapEmailsToIds(ccIds);
  bccIds = mapEmailsToIds(bccIds);

  const allRecipientIds = [...recipientIds, ...ccIds, ...bccIds, senderId];
  const userMetadata = allRecipientIds.reduce((acc, recipientId) => {
    acc[recipientId] = {
      isRead: false,
      isStarred: false,
      isDeleted: false,
      isImportant: false,
      labels: [],
    };
    return acc;
  }, {});

  if (req.params.id) {
    await Email.findByIdAndUpdate(
      req.params.id,
      {
        senderId,
        isDraft,
        recipientIds,
        ccIds,
        bccIds,
        subject,
        body,
        attachments,
        userMetadata,
      },
      {
        new: true,
      }
    );
  } else {
    await Email.create({
      senderId,
      isDraft,
      recipientIds,
      ccIds,
      bccIds,
      subject,
      body,
      attachments,
      userMetadata,
    });
  }

  if (isDraft) {
    return sendSuccess(res, "Draft Saved");
  }

  sendSuccess(res, "Email Sent", notFoundEmails);
};

const getEmails = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 12, category, searchTerm } = req.query;
  let query = { $and: [{ [`userMetadata.${userId}`]: { $exists: true } }] };

  switch (category) {
    case "starred":
      query[`userMetadata.${userId}.isStarred`] = true;
      break;
    case "trash":
      query[`userMetadata.${userId}.isTrashed`] = true;
      break;
    case "important":
      query[`userMetadata.${userId}.isImportant`] = true;
      break;
    case "spam":
      query[`userMetadata.${userId}.isSpam`] = true;
      break;
    case "inbox":
      query.isDraft = false;
      query.senderId = { $ne: userId };
      break;
    case "drafts":
      query.isDraft = true;
      query.senderId = userId;
      break;
    case "sent":
      query.isDraft = false;
      query.senderId = userId;
      break;
    default:
      break;
  }

  if (category !== "trash") {
    query[`userMetadata.${userId}.isTrashed`] = false;
  }
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query.$or = [{ subject: regex }, { body: regex }];
  }

  let emails;
  let total = 0;

  total = await Email.countDocuments(query);
  emails = await Email.find(query)
    .populate("senderId", "username image  email")
    .populate("recipientIds", "username image  email")
    .populate("ccIds", "username image  email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  // }

  if (emails.length === 0) {
    throw new MyError(404, "No Emails Found");
  }
  sendSuccess(res, "Emails Fetched", { emails, total });
};

const getEmailById = async (req, res) => {
  const email = await Email.findById(req.params.id);
  if (!email) {
    throw new MyError(404, "Email not found");
  }
  sendSuccess(res, "Email fetched", email);
};

const deleteEmail = async (req, res) => {
  const email = await Email.findByIdAndDelete(req.params.id);
  if (!email) {
    throw new MyError(404, "Email not found");
  }
  sendSuccess(res, "Email Deleted");
};

const updateRecipientMetadata = async (req, res) => {
  const { emailId } = req.params;
  const userId = req.user._id;
  const update = req.body;

  const email = await Email.findById(emailId);

  if (!email) {
    throw new MyError(404, "Email not found");
  }

  const metadata = email.userMetadata.get(userId);
  if (!metadata) {
    throw new MyError(404, "Recipient not found");
  }

  email.userMetadata.set(userId, { ...metadata, ...update });

  await email.save();
  sendSuccess(res, "Email Updated");
};

module.exports = {
  createEmail,
  getEmails,
  getEmailById,
  deleteEmail,
  updateRecipientMetadata,
};
