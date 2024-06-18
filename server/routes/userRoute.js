const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
