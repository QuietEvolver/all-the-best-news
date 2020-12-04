var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var routes = require("./routes");
var PORT = process.env.PORT || 3000;
var app = express(); 

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use(express.static(__dirname + "/public"));
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://ds147436.mlab.com:47436/heroku_m4w6pbvs@ds147436.mlab.com:47436/heroku_m4w6pbvs";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/unit18Populater";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});




