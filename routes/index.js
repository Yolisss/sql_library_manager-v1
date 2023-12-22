var express = require("express");
var router = express.Router();

var { Book } = require("../models");

/* GET home page. */
router.get("/", async function (req, res, next) {
  //any changes made to book module in code,
  //the sync func is going to update the db to reflect
  //those changes
  // await db.sequelize.sync({ force: true });
  try {
    const books = await Book.findAll();
    console.log(books);
    res.json(books);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
