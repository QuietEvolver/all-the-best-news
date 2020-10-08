/* input Comment/Notes Card
 * front-end
 * ==================== */
var express = require('express');
var router = express.Router();
var db = require('../models');
var cheerio = require('cheerio');
var axios = require('axios');


// Loads results onto the page
function getResults() {
  // Empty any results currently on the page
  // $("#results").empty();
  // // Grab all of the current notes
  // $.getJSON("/all", function(data) {
  //   // For each note...
  //   for (var i = 0; i < data.length; i++) {
  //     // ...populate #results with a p-tag that includes the note's title and object id
  //     $("#results").prepend("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
  //       data[i]._id + ">" + data[i].title + "</span><span class=delete>X</span></p>");
  //   }
  //  });
}

// Runs the getResults function as soon as the script is executed
//getResults();

// When the #make-new button is clicked
// $(document).on("click", "#make-new", function() {
//   // AJAX POST call to the submit route on the server
//   // This will take the data from the form and send it to the server
//   $.ajax({
//     type: "POST",
//     dataType: "json",
//     url: "/submit",
//     data: {
//       title: $("#title").val(),
//       note: $("#note").val(),
//       created: Date.now()
//     }
// })
// If that API call succeeds, add the title and a delete button for the note to the page
//     .then(function(data) {
//     // Add the title and delete button to the #results section
//       $("#results").prepend("<p class='data-entry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
//       data._id + ">" + data.title + "</span><span class=delete>X</span></p>");
//       // Clear the note and title inputs on the page
//       $("#note").val("");
//       $("#title").val("");
//     });
// });

// // When the #clear-all button is pressed
// $("#clear-all").on("click", function() {
//   // Make an AJAX GET request to delete the notes from the db
//   $.ajax({
//     type: "GET",
//     dataType: "json",
//     url: "/clearall",
//     // On a successful call, clear the #results section
//     success: function(response) {
//       $("#results").empty();
//     }
//   });
// });


// When user clicks the delete button for a note
// $(document).on("click", ".delete", function() {
//   // Save the p tag that encloses the button
//   var selected = $(this).parent();
//   // Make an AJAX GET request to delete the specific note
//   // this uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/delete/" + selected.attr("data-id"),

//     // On successful call
//     success: function(response) {
//       // Remove the p-tag from the DOM
//       selected.remove();
//       // Clear the note and title inputs
//       $("#note").val("");
//       $("#title").val("");
//       // Make sure the #action-button is submit (in case it's update)
//       $("#action-button").html("<button id='make-new'>Submit</button>");
//     }
//   });
// });

// // When user click's on note title, show the note, and allow for updates
// $(document).on("click", ".dataTitle", function() {
//   // Grab the element
//   var selected = $(this);
//   // Make an ajax call to find the note
//   // This uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/find/" + selected.attr("data-id"),
//     success: function(data) {
//       // Fill the inputs with the data that the ajax call collected
//       $("#note").val(data.note);
//       $("#title").val(data.title);
//       // Make the #action-button an update button, so user can
//       // Update the note s/he chooses
//       $("#action-button").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
//     }
//   });
// });

// // When user click's update button, update the specific note
// $(document).on("click", "#updater", function() {
//   // Save the selected element
//   var selected = $(this);
//   // Make an AJAX POST request
//   // This uses the data-id of the update button,
//   // which is linked to the specific note title
//   // that the user clicked before
//   $.ajax({
//     type: "POST",
//     url: "/update/" + selected.attr("data-id"),
//     dataType: "json",
//     data: {
//       title: $("#title").val(),
//       note: $("#note").val()
//     },
//     // On successful call
//     success: function(data) {
//       // Clear the inputs
//       $("#note").val("");
//       $("#title").val("");
//       // Revert action button to submit
//       $("#action-button").html("<button id='make-new'>Submit</button>");
//       // Grab the results from the db again, to populate the DOM
//       getResults();
//     }
//   });
// });
//   // Whenever someone clicks a p tag
//   $(document).on("click", "p", function() {
//     // Empty the notes from the note section
//     $("#notes").empty();
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");

//     // Now make an ajax call for the Article
//     $.ajax({
//       method: "GET",
//       url: "/articles/" + thisId
//     })
//       // With that done, add the note information to the page
//       .then(function(data) {
//         console.log(data);
//         // The title of the article
//         $("#notes").append("<h2>" + data.title + "</h2>");
//         // An input to enter a new title
//         $("#notes").append("<input id='titleinput' name='title' >");
//         // A textarea to add a new note body
//         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//         // A button to submit a new note, with the id of the article saved to it
//         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//         // If there's a note in the article
//         if (data.note) {
//           // Place the title of the note in the title input
//           $("#titleinput").val(data.note.title);
//           // Place the body of the note in the body textarea
//           $("#bodyinput").val(data.note.body);
//         }
//       });
//   });

//   // When you click the savenote button
//   $(document).on("click", "#savenote", function() {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");

//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         // Value taken from title input
//         title: $("#titleinput").val(),
//         // Value taken from note textarea
//         body: $("#bodyinput").val()
//       }
//     })
//       // With that done
//       .then(function(data) {
//         // Log the response
//         console.log(data);
//         // Empty the notes section
//         $("#notes").empty();
//       });

//     // Also, remove the values entered in the input and textarea for note entry
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
//   });
const articles = []; //one article at a time out of articleS[]

router.get("/articles", (req, res) => {
  // Grab the articles as a json
  axios.get("https://www.nytimes.com")
    .then(result => {
      const { data } = result; //{}gets data obj out of result
      // console.log(data);
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
  //  console.log(articles);
    res.render("home", {articles});//calls hbs view
    // cb(articles);
  });

    //   console.log("Articles 5 DivGens", articles);
    //   articles.forEach(article => { //one article at a time out of articleS[]
    //       console.log(article.find("h2"), article.find("span"));//rticle.children[0].children[0].children[0].children[0].children[0]);
    //   }) 
    //   res.send("Finished");
    // })
})
// function (bodyinput) { //choose all doms and turns into array
//   console.log(bodyinput);
//   // For each one
//   for (var i = 0; i < bodyinput.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p bodyinput-id='" + bodyinput[i]._id + "'>" + bodyinput[i].title + "<br />" + bodyinput[i].link + "</p>");
//   }
// });

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
    res.render("home", {articles});//calls hbs view
    })
});
router.get("/", (req, res) => {
 // const articleId = req.query.article;
  //get all the notes with article = articleId from mongo and return them in the response
 // db.Note.find({ article: articleId }).then(notes => res.json(notes));
 res.render("home");
//res.send("hello");
});

//delete any notes wanting to be removed
router.get("/deleteArticles/:id", (req, res) => {
  console.log(req.params, req.query, "params/q")
  db.Article.findByIdAndRemove(req.params.id, (err, article) => {
    // As always, handle any potential errors:
    if (err) return res.status(404).send(err);  //404? pg not found? i think it's' 500
    const response = {
      message: "Article successfully deleted",
      id: article._id
    };
   // return res.status(200).send(response);  //page ok
   res.redirect("back");
  });
});

module.exports = router;