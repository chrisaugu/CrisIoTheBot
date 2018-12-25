#!/usr/bin/env node
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let passport = require('passport');
let FacebookTokenStrategy = require('passport-facebook-token');
let FacebookStrategy = require('passport-facebook').Strategy;
let fs = require('fs-extra');

var dt = require('./myfirstmodel');

// Database
require("./database");

// Models
// require("./models/model");
require('./models/product');
require('./models/movie');
require('./models/quote');
require('./models/user');

// Flogg
require('./models/flogg_user');
require('./models/visitor');

// var connectToTwitter = require('./twitter_bot');
// get the app to connect to twitter.
// connectToTwitter();

// Creating express app
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(passport.initialize());
// // app.use(passport.session());

// /** Registers a function used to serialize user objects into the session. */
// passport.serializeUser((user, done) => {
// 	console.log(user);
// 	done(null, user._id);
// });
// /** Registers a function used to deserialize user objects out of the session. */
// passport.deserializeUser((id, done) => {
// 	User.findById(id).then((user) => {
// 		done(null, user);
// 	});
// });

// additional setup to allow CORS requests
app.use(function allowCrossDomain(req, response, next) {
	response.header('Access-Control-Allow-Origin', "http://localhost/");
	response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	if ('OPTIONS' == req.method) {
		response.sendStatus(200);
	}
	else {
		next();
	}
});

//var page = fs.readFileSync(__dirname + '/index.html', 'utf8');

app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("Deployed at " + dt.myDateTime());
	res.end();
});

app.use('/api/v1/', require('./routes/api'));
app.use('/flogg/api/1', require('./routes/flogg-api'));

module.exports = app;