var express = require("express");
var router = express.Router();

var { Book } = require("../models");
var createError = require("http-errors");

router.get("/", async function (req, res, next) {
  //any changes made to book module in code,
  //the sync func is going to update the db to reflect
  //those changes
  // await db.sequelize.sync({ force: true });
  const books = await Book.findAll();
  console.log(books);
  //ref index.pug => template; books as variable
  res.render("index", { books, title: "Books" });
});

router.get("/new", async function (req, res, next) {
  res.render("new-book");
});
//2.req body returns an obj containing key/value pairs aka form data
//ex if we console.log(req.body) we get props of form inputs =>
//{title: "", author: "", genre: "", year=""}
//so we'll pass req.body within create
router.post("/new", async function (req, res, next) {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    //throw error;
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error", {
        book,
        errors: error.errors,
        title: "New Book",
      });
    } else {
      throw error;
    }
  }
});

router.get("/:id", async function (req, res, next) {
  //using SQL's findByPk method
  //FindByPk is an async call that returns a promise whose resolved
  //value is the single instance retrieved by they key or id value
  //2. retrieve a book by passing findByPk the book id
  //in express rroutes, you use route params to capture values specified
  //in the URL path (req.params)
  const book = await Book.findByPk(req.params.id);
  if (book === null) {
    res.status(404);
    res.render("page-not-found");
    console.log("book is null");
  } else {
    res.render("update-book", { book });
  }
});

router.post("/:id", async function (req, res, next) {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/books/" + book.id);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("form-error", {
        book,
        errors: error.errors,
        title: "Update Book",
      });
    } else {
      throw error;
    }
  }
});

router.post("/:id/delete", async function (req, res, next) {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/");
});

module.exports = router;
