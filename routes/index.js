var express = require("express");
var router = express.Router();



/* GET home page. */
router.get("/", function (req, res, next) {
  (async() =>{
    await db.sequelize.sync({force: true});
    try{
      const books = await Book.findAll({
        attributes: ['title', 'author', 'genre', 'year'],
        return res.json(books);
        console.log(json); 
  })
    } catch(error){
      console.log(error)
    }
  })
});
module.exports = router;

db.models.Book = require("./models/books.js")(sequelize);