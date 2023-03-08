const express = require("express");
const router = express();
const { createCMSOwner, getCMSUsers, createCMSUser } = require("./controller");
// import authentication
const {
    authorizeRoles,
    authenticateUser,
  } = require("../../../middlewares/auth");

router.post("/owner",  createCMSOwner);
router.get("/users", authenticateUser, getCMSUsers);
router.post("/users", authenticateUser, createCMSUser);

module.exports = router;