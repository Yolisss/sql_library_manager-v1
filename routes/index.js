var express = require("express");
var router = express.Router();

var { Book } = require("../models");

const app = express();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/books");
});

module.exports = router;
