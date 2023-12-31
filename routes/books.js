var express = require("express");
var router = express.Router();

var { Book } = require("../models");
var createError = require("http-errors");

//shows full list of books
router.get("/", async function (req, res, next) {
  const books = await Book.findAll();
  res.render("index", { books, title: "Books" });
});

//create new form
router.get("/new", async function (req, res, next) {
  res.render("new-book");
});

//post a new book to db
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

//show book detail form
router.get("/:id", async function (req, res, next) {
  const book = await Book.findByPk(req.params.id);
  if (book === null) {
    res.status(404);
    res.render("page-not-found");
    //console.log("book is null");
  } else {
    res.render("update-book", { book });
  }
});

//updates book info in db
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

//deletes a book
router.post("/:id/delete", async function (req, res, next) {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
