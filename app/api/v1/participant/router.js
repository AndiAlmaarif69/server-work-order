const express = require("express");
const router = express();
const { signup, signin } = require("./controller");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);

module.exports = router;
