// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var mysql = require("mysql");

var con = mysql.createConnection({
	host: "localhost",
	database: "shrtlnco",
	user: "root",
	password: "shrtlnco"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

// Get all files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/link', function (req, res) {
    var linkKey = req.body.linkKey;
    var link = req.body.linkURL;
    con.query("INSERT INTO links (linkkey, finallink) VALUES ('"+linkKey+"', '"+link+"');", function(err) {
        console.log(err);
    })
});

// Listen on port 7002
http.listen(7002, function() {
    console.log('listening on port 7002');
});



// con.end(function(err) {});