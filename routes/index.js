var express = require("express");
var router = express.Router();

var sequelize = require("../models");

/* GET home page. */
router.get("/", function (req, res, next) {
  async () => {
    await db.sequelize.sync({ force: true });
    try {
      const books = await Book.findAll();
      res.json(books);
      console.log(res.render());
    } catch (error) {
      console.log(error);
    }
  };
});
module.exports = router;
