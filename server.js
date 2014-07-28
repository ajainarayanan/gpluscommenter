var express = require("express");
var app = express();
var http = require('http');
var path = require('path');
app.use(express.static(path.join(__dirname)));
app.get("/", function (req, res) {
  req.render("index.html");
});
app.get("/something", function(req, res) {
  req.render("something.html");
})
http.createServer(app).listen(3000, function () {
  console.log("App listening in port 3000");
});
