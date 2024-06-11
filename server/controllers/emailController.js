const Email = require("../models/Email");
const { sendSuccess } = require("../utils/helperFunctions");

const createEmail = async (req, res) => {
  const { isDraft, recipientIds, ccIds, bccIds, subject, body, attachments } =
    req.body;

  const senderId = req.user._id;

  const userMetadata = recipientIds.reduce((acc, recipientId) => {
    acc[recipientId] = {
      isRead: false,
      isStarred: false,
      isDeleted: false,
      isImportant: false,
      labels: [],
    };
    return acc;
  }, {});

  const email = new Email({
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

  await email.save();
  sendSuccess(res, "Email Created", email);
};

const getEmails = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, category, searchTerm } = req.query;
  let query = { isDraft: false }; // Ensure emails fetched are not drafts

  switch (category) {
    case "starred":
      query[`userMetadata.${userId}.isStarred`] = true;
      break;
    case "trashed":
      query[`userMetadata.${userId}.isTrashed`] = true;
      break;
    case "important":
      query[`userMetadata.${userId}.isImportant`] = true;
      break;
    case "draft":
      query.isDraft = true;
      break;
    default:
      break;
  }

  // Add filters based on search term
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query.$or = [{ subject: regex }, { body: regex }];
  }

  let emails;
  if (category === "sent") {
    // Fetch sent emails
    emails = await Email.find({ senderId: userId, isDraft: false })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    // Fetch all emails with applied filters
    query.$or = query.$or || [];
    query.$or.push({ [`userMetadata.${userId}`]: { $exists: true } });
    emails = await Email.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  sendSuccess(res, "Emails Fetched", emails);
};

const getEmailById = async (req, res) => {
  const email = await Email.findById(req.params.id);
  if (!email) {
    throw new MyError(404, "Email not found");
  }
  sendSuccess(res, "Email fetched", email);
};

const updateEmail = async (req, res) => {
  const email = await Email.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!email) {
    throw new MyError(404, "Email not found");
  }
  sendSuccess(res, "Email Updated", email);
};

const deleteEmail = async (req, res) => {
  const email = await Email.findByIdAndDelete(req.params.id);
  if (!email) {
    throw new MyError(404, "Email not found");
  }
  res.status(200).json({ message: "Email deleted" });
};

const updateRecipientMetadata = async (req, res) => {
  const { emailId } = req.params;
  const userId = req.user._id;
  const update = req.body;

  const email = await Email.findById(emailId);

  if (!email) {
    throw new MyError(404, "Email not found");
  }

  if (!email.userMetadata[userId]) {
    throw new MyError(404, "Recipient not found");
  }

  email.userMetadata[userId] = {
    ...email.userMetadata[userId],
    ...update,
  };

  await email.save();
  res.status(200).json(email);
};

module.exports = {
  createEmail,
  getEmails,
  getEmailById,
  updateEmail,
  deleteEmail,
  updateRecipientMetadata,
};
