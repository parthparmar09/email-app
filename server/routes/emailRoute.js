const express = require("express");
const router = express.Router();
const {
  createEmail,
  deleteEmail,
  getEmails,
  getEmailById,
  updateRecipientMetadata,
} = require("../controllers/emailController");

router.route("/").get(getEmails).post(createEmail);

router.route("/:id").get(getEmailById).post(createEmail).delete(deleteEmail);

router.patch("/:emailId/metadata", updateRecipientMetadata);

module.exports = router;
