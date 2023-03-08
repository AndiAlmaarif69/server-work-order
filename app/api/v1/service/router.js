const express = require("express");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth");
const router = express();
const { create, index, find, update, destroy, changeStatus } = require("./controller");

router.post("/services", authenticateUser, authorizeRoles('owner'), create);
router.get("/services", authenticateUser, authorizeRoles('owner'), index);
router.get("/services/:id", authenticateUser, authorizeRoles('owner'), find);
router.put("/services/:id", authenticateUser, authorizeRoles('owner'), update);
router.delete("/services/:id", authenticateUser, authorizeRoles('owner'), destroy);
router.put("/services/:id/status", authenticateUser, authorizeRoles('owner'), changeStatus);

module.exports = router;
