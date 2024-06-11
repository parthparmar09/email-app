const express = require("express");
const router = express.Router();
const {
  sendEmail,
  getInbox,
  getSent,
  getDrafts,
  updateEmail,
  deleteEmail,
} = require("../controllers/emailController");

router.post("/", sendEmail);
router.get("/inbox", getInbox);
router.get("/sent", getSent);
router.get("/drafts", getDrafts);
router.route("/:id").put(updateEmail).delete(deleteEmail);

module.exports = router;
