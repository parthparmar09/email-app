const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userMetadataSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isStarred: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const emailSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  recipientIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  ccIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bccIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "Body is required"],
  },
  attachments: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userMetadata: [userMetadataSchema],
});

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
