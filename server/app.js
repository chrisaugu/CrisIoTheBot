let express = require("express");
let bodyParser = require("body-parser");
let passport = require('passport');
let FacebookTokenStrategy = require('passport-facebook-token');
let FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let fs = require('fs-extra');
let path = require('path');
let cors = require('cors');

var dt = require('./lib/myfirstmodel');
var middlewares = require('./lib/middlewares');
// var xmlParser = require('./lib/parser');

// Models
require("./models/music");
require('./models/movie');
require('./models/quote');
require('./models/phonetracker');

// Creating express app
const app = express();
const router = express.Router();

// Express configuration
app.set('port', process.env.PORT || 3456);
// app.set('env', 'production');
// Tell express where it can find the templates
// app.set('views', path.join(__dirname + '/views'));
//Set ejs as the default template
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
// Make the files in the app/ folder avilable to the world
// app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'client')));
// app.use('/images', express.static(path.join(__dirname, 'client/img')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.configure(function(e){
// 	return 1;
// });

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
// app.use(middlewares.allowCrossDomain);
// app.options('*', cors(middlewares.cors));
app.use(cors(middlewares.cors));
app.use(middlewares.referrerHeader());
// app.use(middlewares.isLoggedIn);

// restrict access for visitors
// app.use(middlewares.auth);

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://www.example.com/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }));

// var page = fs.readFileSync(__dirname + '/index.html', 'utf8');

app.use('/api', router);
require('./routes/bot')(router);
app.use('/api', require('./routes/api'));

module.exports = app;