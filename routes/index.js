var express = require('express');
var router = express.Router();
var db = require('../models');
var cheerio = require('cheerio');
var axios = require('axios');

//function getResults() {

const articles = []; 

router.get("/articles", (req, res) => { 
  axios.get("https://www.nytimes.com")
    .then(result => {
      const { data } = result; 
      const $ = cheerio.load(data);
     
      $("article").each(function(i, element){
        const head = $(this).find("h2").text().trim();
        const sum = $(this).find("span").text().trim();

        if (head && sum) {
            const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            const dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };

            articles.push(dataToAdd);
        }
    }); 
    res.render("home", {articles});  
  });
})

router.get("/saved", (req, res) => { 
  db.Article.find()
  .then(savedArticles => {
    console.log(savedArticles)
    res.render("saved", { articles: savedArticles }); 
  })

})

router.post("/saveArticles", (req, res) => {
    console.log(req.body);
    const {headline, summary} = req.body;
    db.Article.create({ headline, summary, saved:true })
    .then( dbArticle => { 
    res.render("home", {articles});
    })
});
router.get("/", (req, res) => {
 res.render("home");
});
 
router.get("/deleteArticles/:id", (req, res) => {
  console.log(req.params, req.query, "params/q")
  db.Article.findByIdAndRemove(req.params.id, (err, article) => { 
    if (err) return res.status(404).send(err);  
    const response = {
      message: "Article successfully deleted",
      id: article._id
    }; 
   res.redirect("back");
  });
});
//}
module.exports = router;