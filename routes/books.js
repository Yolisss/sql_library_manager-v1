var express = require("express");
var router = express.Router();

var { Book } = require("../models");

router.get("/", async function (req, res, next) {
  //any changes made to book module in code,
  //the sync func is going to update the db to reflect
  //those changes
  // await db.sequelize.sync({ force: true });
  const books = await Book.findAll();
  console.log(books);
  //ref index.pug => template; books as variable
  res.render("index", { books });
});

router.get("/new", async function (req, res, next) {
  res.render("new-book");
});
router.post("/new", async function (req, res, next) {
  //nothing yet
});
router.get("/:id", async function (req, res, next) {
  const bookId = parseFloat(req.params.id);
  const book = books.find((book) => book.id === bookId);
  console.log(books);
  console.log(typeof bookId);
  if (project) {
    res.render("index");
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry, project cannot be found";
    console.log(message);
    next(err);
  }
});
router.post("/:id", async function (req, res, next) {
  //nothing yet
});
router.post("/:id/delete", async function (req, res, next) {
  //nothing yet
});

module.exports = router;
