const express = require("express");
const router = express();
const { index } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get(
  "/orders",
  authenticateUser,
  authorizeRoles("owner"),
  index
);

module.exports = router;