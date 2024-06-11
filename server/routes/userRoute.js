const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
