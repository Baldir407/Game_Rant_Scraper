// Requiring dependencies 
var express = require("express");
var bodyParser = require("bodyParser");
var mongoose = require("mongoose");
var exphbars = require("express-handlebars");

// Port set up on port 8000
var PORT = process.env.PORT || 8000;

// Express app
var app = express();

// Routes
var routers = require("./routes");

// Public folder = static
app.use(express.static("public"));

// Connecting handlebars
app.engine("handlebars", exphbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Gotta get bodyparser in there too
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Requests through route
app.use(routes);

// If deployed use deployed database. Otherwise using local mongoHeadlines
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connecting to Mongo DB
mongoose.connect(MONGODB_URI);

// Port listen function/console.log
app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});

