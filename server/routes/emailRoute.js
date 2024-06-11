const express = require("express");
const router = express.Router();
const {
  createEmail,
  deleteEmail,
  getEmails,
  updateEmail,
  getEmailById,
  updateRecipientMetadata,
} = require("../controllers/emailController");

router.route("/").post(createEmail).get(getEmails);

router.route("/:id").get(getEmailById).put(updateEmail).delete(deleteEmail);

router.patch("/:emailId/recipientUpdate", updateRecipientMetadata);

module.exports = router;
