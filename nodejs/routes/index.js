const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("hello, express");
});

router.get("/users", function (req, res) {
  res.send("hello, express users");
});

module.exports = router;
