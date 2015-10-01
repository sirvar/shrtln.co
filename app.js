/*
(c) 2015 Rikin Katyal
app.js
*/

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var mysql = require("mysql");

// Create connection to mysql database
var con = mysql.createConnection({
    host: "localhost",
    database: "shrtlnco",
    user: "root",
    password: "DATABASE_PASSWORD"
});

con.connect(function(err) {
    if (err) {
        console.log('Database Error');
        return;
    }
    console.log('Database Connected');
});

// Get all files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:link', function(req, res) {
	var link = req.params.link;
	checkExisting(link, function(found) {
		if (found) {
			getURL(link, function(result) {
				res.redirect("http://"+result[0].finallink);
			});
		} else {
            res.redirect("/");
        }
	});
});

// Initialize body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Post request from client to create new shrtln
app.post('/link', function(req, res) {
    // Get values from client
    var linkKey = req.body.linkKey;
    var link = req.body.linkURL;
    // Query db to check if it already exists
	checkExisting(linkKey, function(found) {
		if (!found) {
            // Insert new shrtln into db
			query("INSERT INTO links (linkkey, finallink) VALUES ('" + linkKey + "', '" + link + "');");
            // Send success message to client
            res.send({
                success: true,
                message: "Great! visit your new shrtln at <a href='http://shrtln.co/"+linkKey+"'>http://shrtln.co/"+linkKey+"</a>. Don't worry. We will never delete your shrtln."
            })
		} else {
            // Send error message to client
            res.send({
                success: false,
                message: "Yeah... The shrtln "+ linkKey +" already exists. Please choose another one."
            })
        }
	});
});

// Listen on port 7002
http.listen(7002, function() {
    console.log('listening on port 7002');
});

// Simple query with no return
function query(q) {
	con.query(q, function(err) {
        if (err) {
            console.log("error ", err);
        }
    })
}
// Checks if key already links to another URL
function checkExisting(key, callback) {
    con.query("SELECT linkkey FROM links;", function(err, res) {
    	if (err) {
            console.log("error ", err);
        }
        // Returns true if exists
        callback(res.map(function(row) {
            return row.linkkey;
        }).indexOf(key) >= 0);
    })
}

// Returns URL based on key to redirect
function getURL(key, callback) {
	con.query("SELECT finallink FROM links WHERE linkkey='"+key+"';", function(err, res) {
    	if (err) {
            console.log("error ", err);
        }
        callback(res);
    })
}
