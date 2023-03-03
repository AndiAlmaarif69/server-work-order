const express = require("express");
const router = express();
const { createCMSAdmin } = require("./controller");

router.post("/admin", createCMSAdmin);

module.exports = router;
