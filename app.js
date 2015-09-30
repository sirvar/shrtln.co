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
    password: "ubuntu"
});

con.connect(function(err) {
    if (err) {
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

app.get('/:link', function(req, res) {
	var link = req.params.link;
	checkExisting(link, function(found) {
		if (found) {
			getURL(link, function(result) {
                console.log("yo1")
				res.redirect("http://"+result[0].finallink);
			});
		} else {
            console.log("yo2")
            res.redirect("/");
        }
	});
});


app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/link', function(req, res) {
    var linkKey = req.body.linkKey;
    var link = req.body.linkURL;
	checkExisting(linkKey, function(found) {
		if (!found) {
			query("INSERT INTO links (linkkey, finallink) VALUES ('" + linkKey + "', '" + link + "');");
			console.log("now exists");
		};
	});
});

// Listen on port 7002
http.listen(7002, function() {
    console.log('listening on port 7002');
});

function query(q) {
	con.query(q, function(err) {
        if (err) {
            console.log("error ", err);
        }
    })
}

function checkExisting(key, callback) {
    con.query("SELECT linkkey FROM links;", function(err, res) {
    	if (err) {
            console.log("error ", err);
        }
        for (var i = res.length - 1; i >= 0; i--) {
        	if (key === res[i].linkkey) {
        		callback(true);
        		break;
        	}
        }
        callback(false);
    })
}

function getURL(key, callback) {
	con.query("SELECT finallink FROM links WHERE linkkey='"+key+"';", function(err, res) {
    	if (err) {
            console.log("error ", err);
        }
        callback(res);
    })
}

// con.end(function(err) {});