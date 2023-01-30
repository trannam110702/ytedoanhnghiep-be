var express = require("express");
var local = require("../local.json");
var router = express.Router();

router.get("/", async function (req, res, next) {
  res.send(local);
});

module.exports = router;
