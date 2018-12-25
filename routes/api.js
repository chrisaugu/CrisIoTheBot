
/**
 * Export default singleton.
 *
 * @api public
 */
// /api/v1/digicel

// Dependencies
const restful = require('node-restful');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;
const request = require('request-promise');
const router = require('express').Router();

// Models
let Movie = restful.model('movie');
let Quote = restful.model('quote');

Movie.methods(['get', 'post', 'put', 'delete']);
Movie.register(router, '/movies');

Quote.methods(['get', 'put', 'post', 'delete']);
Quote.register(router, '/quotes');

require("./digicel-api")(router);
require("./telikom-api")(router);
require("./zyknet-api")(router);
// require("./webhook")(router);
require('./pomsox-api')(router);
require('./post_api')(router);

/*module.exports = function() {
	// Create an API namespace, so that the root does not
	// have to be repeated for each end point.
	api.namespace("/api/v1", function() {
	// Return fixture data for "/api/activities"
	api.get("/activities", function(req, res) {
		var activities = {
		"activities": [{
			id: 0,
			display_id: "Activity1",
			searchresults_type: "song",
			display_name: "On the Road Again",
			hotnesss: 54,
			timestamp: "Fri Dec 06 2013 01:05:53 GMT-0600 (CST)"
		}, {
			id: 1,
			display_id: "Activity2",
			searchresults_type: "artist",
			display_name: "Willie Nelson",
			hotnesss: 99,
			timestamp: "Fri Dec 06 2013 01:05:53 GMT-0600 (CST)"
		}]
		};
		res.send(activities);
	});
	});
};*/

router.param('id', function(req, res, next, id){
	// User.find(id, function(err, user){
	// 	if (err) {
	// 		return next(err);
	// 	} else if (!user) {
	// 		return next(new Error('failed to load user'));
	// 	}
	// 	req.user = user;
	// 	req.session.c_user = user[0].uid;
	// 	next();
	// });
	next();
});

// Server index page
router.get("/", function (req, res) {
	res.send("Deployed!");
	// res.redirect('/api/v1/')
});

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

// route for showing the profile page
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', {
		user : req.user // get the user out of session and pass to template
	});
});


router.get('/friendslist', function(req, res) {
	var prof_id = 100004177278169;
	// make a request to https://mobile.facebook.com/
	// $("[name=target]").value
	// returns user id
	
	function getids(a, b, c) {
	    var d = a.length;
	    if (0 == d) return [];
	    var f, e = 0,
	        g = [];
	    for (c || (b = b.toLowerCase(), a = a.toLowerCase());
	        (f = b.indexOf(a, e)) > -1;) g.push(f), e = f + d;
	    return g
	}
			getFriendsList()
	
	//gets an array of ids of all active users in friends list.
	function getFriendsList() {
		for (indx = 0; true; indx++) {
	
			// console.log(ids);
			var counter = 0;
			var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
			var a = new XMLHttpRequest();
			a.open("GET", "https://www.facebook.com/ajax/browser/list/allfriends/?uid=" + prof_id + "&location=friends_tab_tl&__a=1&__dyn=&__req=&start=" + indx, !1), a.send(null);
			var responseTxt = a.responseText;
			var ids = getids("data-profileid", responseTxt);
			if (ids.length < 2) {
				break;
			}
			//shortens list to make testing easier
			// if ( indx > 100 ) {
			//	console.log("shuttin' dwwosdafwn")
			//	break;
			// }
			for (let k = 0; k < ids.length; k += 2) {
				var l = responseTxt.substring(ids[k] + 17),
					m = l.indexOf('"');
				let newfrid = responseTxt.substring(ids[k] + 17, ids[k] + 16 + m);
				if (!friends.includes(newfrid)) {
					friends.push(newfrid);
				}
				counter = friends.length;
				console.log(counter);
			}
		}
	};
});

// route for logging out
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
/**
 * Facebook Endpoints
 * @Router /api/v1/auth/facebook
 * Request will be redirected to Facebook
 */
router.get('/auth/facebook', passport.authenticate('facebook', {
	authType: 'rerequest',
	scope: ['public_profile', 'id', 'name', 'age', 'age_range', 'gender', 'profile_pic', 'picture', 'user_photos', 'user_friends', 'friends']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect : '/',
	failureRedirect : '/connect'
}), function(req, res) {
	// Successful authentication, redirect home
	res.json(req.user);
	// res.redirect('/');
});

/**
 * Instagram Endpoints
 * @Router /api/v1/auth/instagram
 */
router.get('/auth/instagram', passport.authenticate('instagram'), function(req, res) {
	// request will be redirected to Instagram
});
router.get('/auth/instagram/callback', passport.authenticate('instagram'), function(req, res) {
	res.json(req.user);
});

/**
 * GET /api/v1/instagam/photos
 * Get photos from instagram
 */
router.get("/instagram/photos", function (req, res, next) {
	res.send("Welcome to StuckWanYah instagram. I collect peeple's photos from instagram, you vote who's hotter?")
})
router.post("/instagram/photos", function(req, res, next){
	var body = req.body;
	Photo.findOne({ instagramId: body.user.id }, function(err, existingUser){
		if (existingUser) {
			var token = createToken(existingUser);
			return res.send({ token: token, user: existingUser });
		}

		var user = new User({
			instagramId: body.user.id,
			username: body.user.username,
			displayName: body.user.full_name,
			picture: body.user.profile_picture,
			accessToken: body.access_token
		});

		user.save(function(){
			var token = createToken(user);
			res.send({ token: token, user: user });
		});
	});
});

/**
 * Twitter Endpoints
 * @Router /api/v1/auth/twitter
 */
router.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
	// request will be redirected to Twitter
});
router.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
	res.json(req.user);
});

router.get('/post_to_facebook', function(req, res, next) {
	var getMediaOptions = function(event){
		var options = {
			method: "GET",
			uri: `https://graph.facebook.com/v2.8/${event.user.id}`,
			qs: {
				access_token: keys.facebook.pageAccessToken,
				type: 'user',
				fields: 'photos.limit(2).order(reverse_chronological){link, comments.limit(2).order(reverse_chronological)}'
			}
		};
		return request(options).then(function(fbRes){
			res.json(fbRes);
		});
	};
	
	function postingImage(){
		const id = 'page or user id goes here';
		const access_token = 'for page if posting to a page, for user if posting to a user\'s feed';
		
		var postImageOptions = {
			method: 'POST',
			uri: `https://graph.facebook.com/v2.8/${id}/photos`,
			qs: {
			access_token: access_token,
			caption: 'Caption goes here',
			url: 'Image url goes here'
			}
		};
		
		request.post(postImageOptions);
	};

	function getUserProfilePicture(userId) {
		return "https://graph.facebook.com/"+ userId +"/picture?type=large";
	};
});

/**
 * GET /webhook
 * Facebook Webhook Endpoints
 * Used for messenger verification
 */ 
router.get('/webhook', function(request, response) {
	let mode = request.query['hub.mode'];
	let token = request.query['hub.verify_token'];
	let challenge = request.query['hub.challenge'];

	if ((mode === 'subscribe' && token === process.env.BOT_VERIFY_TOKEN) || 
		(mode === 'subscribe' && token === process.env.VERIFICATION_TOKEN)) {
		console.log("Verified webhook");
		response.status(200).send(request.query['hub.challenge']);
	} else {
		console.error("Verification failed. The tokens do not match.");
		response.sendStatus(403);
	}
});

/**
 * POST /webhook
 * Facebook Webhook Endpoints
 * All callbacks for Messenger will be POST-ed here
 */
router.post("/webhook", function (req, res) {
	console.log("Received webhook");

	let body = req.body;

	// Make sure this is a page subscription
	if (body.object == "page") {
		// Iterate over each entry
		// There may be multiple entries if batched
		body.entry.forEach(function(entry) {
			var pageID = entry.id;
			var timeOfEvent = entry.time;
			// Iterate over each messaging event
			entry.messaging.forEach(function(event) {
				if (event.postback) {
					processPostback(event);
				} else if (event.message) {
					processMessage(event);
				}
			});
		});
		res.sendStatus(200);
	}
});

/**
 * Postback
 * Postback
 */
function processPostback(event) {
	var senderId = event.sender.id;
	var payload = event.postback.payload;

	if (payload === "Greeting") {
		// Get user's first name from the User Profile API
		// and include it in the greeting
		request({
			url: "https://graph.facebook.com/v2.6/" + senderId,
			qs: {
				access_token: process.env.PAGE_ACCESS_TOKEN,
				fields: "first_name"
			},
			method: "GET"
		}, function(error, response, body) {
			var greeting = "";
			if (error) {
				console.log("Error getting user's name: " +	error);
			} else {
				var bodyObj = JSON.parse(body);
				name = bodyObj.first_name;
				greeting = "Hi " + name + ". ";
			}
			var message = greeting + "I am CrisBot. I am a bot. I can tell you various details regarding movies. What movie would you like to know about?";
			sendMessage(senderId, {text: message});
		});
	} else if (payload === "Correct") {
		sendMessage(senderId, {text: "Awesome! What would you like to find out? Enter 'plot', 'date', 'runtime', 'director', 'cast' or 'rating' for the various details."});
	} else if (payload === "Incorrect") {
		sendMessage(senderId, {text: "Oops! Sorry about that. Try using the exact title of the movie"});
	}
};

function processMessage(event) {
	if (!event.message.is_echo) {
		var message = event.message;
		var senderId = event.sender.id;

		console.log("Received message from senderId: " + senderId);
		console.log("Message is: " + JSON.stringify(message));

		// You may get a text or attachment but not both
		if (message.text) {
			var formattedMsg = message.text.toLowerCase().trim();

			// If we receive a text message, check to see if it matches any special
			// keywords and send back the corresponding movie detail.
			// Otherwise search for new movie.
			switch (formattedMsg) {
				case "plot":
				case "date":
				case "runtime":
				case "director":
				case "cast":
				case "rating":
					getMovieDetail(senderId, formattedMsg);
					break;
				default:
					findMovie(senderId, formattedMsg);
					break;
			}

		} else if (message.attachments) {
			sendMessage(senderId, {text: "Sorry, I don't understand your request."});
		}
	}
};

/*
switch (payload) {
case 'get_started':
	sendGetStarted(senderID);
	break;
default:
	sendTextMessage(senderID, "Postback called");
}
*/

function findMovie(userId, movieTitle) {
	request("http://www.omdbapi.com/?type=movie&t=" + movieTitle, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieObj = JSON.parse(body);
			
			if (movieObj.Response === "True") {
				var query = {user_id: userId};
				var update = {
					user_id: userId,
					title: movieObj.Title,
					plot: movieObj.Plot,
					date: movieObj.Released,
					runtime: movieObj.Runtime,
					director: movieObj.Director,
					cast: movieObj.Actors,
					rating: movieObj.imdbRating,
					poster_url: movieObj.Poster
				};
				
				var options = {upsert: true};
				Movie.findOneAndUpdate(query, update, options, function(err, mov) {
					if (err) {
						console.log("Database error: " + err);
					} else {
						message = {
							attachment: {
								type: "template",
								payload: {
									template_type: "generic",
									elements: [{
										title: movieObj.Title,
										subtitle: "Is this the movie you are looking for?",
										image_url: movieObj.Poster === "N/A" ? "http://placehold.it/350x150" : movieObj.Poster,
										buttons: [{
											type: "postback",
											title: "Yes",
											payload: "Correct"
										}, {
											type: "postback",
											title: "No",
											payload: "Incorrect"
										}]
									}]
								}
							}
						};
						sendMessage(userId, message);
					}
				});
			} else {
				console.log(movieObj.Error);
				sendMessage(userId, {text: movieObj.Error});
			}
		} else {
			sendMessage(userId, {text: "Something went wrong. Try again."});
		}
	});
};

function getMovieDetail(userId, field) {
	Movie.findOne({user_id: userId}, function(err, movie) {
		if(err) {
			sendMessage(userId, {text: "Something went wrong. Try again"});
		} else {
			sendMessage(userId, {text: movie[field]});
		}
	});
}

// Handle messages sent by player directly to the game bot here
function receivedMessage(event) {}

// Handle game_play (when player closes game) events here. 
function receivedGameplay(event) {
	// Page-scoped ID of the bot user
	var senderId = event.sender.id; 
	// FBInstant player ID
	var playerId = event.game_play.player_id; 
	// FBInstant context ID 
	var contextId = event.game_play.context_id;
	// Check for payload
	if (event.game_play.payload) {
		// The variable payload here contains data set by
		// FBInstant.setSessionData()
		var payload = JSON.parse(event.game_play.payload);
		// In this example, the bot is just "echoing" the message received
		// immediately. In your game, you'll want to delay the bot messages
		// to remind the user to play 1, 3, 7 days after game play, for example.
		sendMessage(senderId, null, "Want to play again?", "Play now!", payload);
	}
}

// Send bot message
//
// player (string) : Page-scoped ID of the message recipient {recipientId}
// context (string): FBInstant context ID. Opens the bot message in a specific context
// message (string): Message text
// cta (string): Button text
// payload (object): Custom data that will be sent to game session
function sendMessage(player, context, message, cta, payload) {
	var button = {
		type: "game_play",
		title: cta
	};

	if (context) {
		button.context = context;
	}
	if (payload) {
		button.payload = JSON.stringify(payload)
	}
	var messageData = {
		recipient: {
			id: player
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "generic",
					elements: [{
						title: message,
						buttons: [button]
					}]
				}
			}
		}
	};
	callSendAPI(messageData);
};

function callSendAPI(messageData) {
	var graphUrl = "https://graph.facebook.com/v2.8/me/messages";
	var graphApiUrl = 'https://graph.facebook.com/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN
	request({
		url: graphApiUrl,
		qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
		method: "POST",
		json: true,
		body: messageData
	}, function (error, response, body){
		if (error) {
			console.error("Error sending message: " + response.error);
		};
		console.log('send api returned', 'error', error, 'status code', response.statusCode, 'body', body);
	});
};

// Handles messages events
function handleMessage(senderId, received_message) {
	let response;

	// Check if the message contains text 
	if (received_message.text) {

		// Create the payload for a basic text message
		response = {
			"text": `You sent the message: "${received_message.text}". Now send me and image!`
		}
	} else if (received_message.attachments) {

		// Gets the URL of the message attachment
		let attachment_url = received_message.attachments[0].payload.uri;
		response = {
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [{
						"titile": "Is this the right picure?",
						"subtitle": "Tap a button to answer.",
						"image_url": attachment_url,
						"buttons": [{
							"type": "postback",
							"titie": "Yes!",
							"payload": "yes"
						},{
							"type": "postback",
							"titie": "No!",
							"payload": "no"
						}]
					}]
				}
			}
		}
	}

	// Sends the response message
	callSendMessage(senderId, response);
};

// Handles messaging_postbacks events
function handlePostback(senderId, received_postback) {
	let response;

	// Get the payload for the postback
	let payload = received_postback.payload;

	// Set response based on the postback payload
	if (payload === 'yes') {
		response = { "text": "Thanks!" }
	} else if (payload === 'no') {
		response = { "text": "Oops, try sending another message"}
	}

	// Send the message to acknowledge the postback
	callSendMessage(senderId, response);
}

// Sends response messages via the Send API
function callSendMessage(senderId, response) {
	// Construct the message body
	let request_body = {
		"recipient": {
			"id": senderId
		},
		"message": response
	}

	// Send the HTTPS request to the Messenger Platform
	request({
		"uri": "https://graph.facebook.com/v6.12/me/messages",
		"qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
		"method": "POST",
		"json": request_body
	}, function(error, response, body) {
		if (!error) {
			console.log('message sent');
		} else {
			console.error("Unable to send message: " + error);
		}
	});
};

function sendGetStarted(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "button",
					text: "Welcome to the Bot Hotel, I can help with any of the three requests below.",
					buttons:[{
						type: "postback",
						title: "Check in",
						payload: "check_in"
					}, {
						type: "postback",
						title: "Room Service",
						payload: "room_service"
					}, {
						type: "phone_number",
						title: "Call Reception",
						payload: "+16505551234"
					}]
				}
			}
		}
	}
	callSendAPI(messageData);
};

function findMusic(userId, musicTitle) {
	request("http://www.omdbapi.com/?type=movie&t=" + musicTitle, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var musicObj = JSON.parse(body);
		if (musicObj.Response === "True") {
	var query = {user_id: userId};
	var update = {
		user_id: userId,
		title: musicObj.Title,
		plot: musicObj.Plot,
		date: musicObj.Released,
		runtime: musicObj.Runtime,
		director: musicObj.Director,
		cast: musicObj.Actors,
		rating: musicObj.imdbRating,
		poster_url:musicObj.Poster
	};
	var options = {upsert: true};
	Music.findOneAndUpdate(query, update, options, function (err, mus) {
		if (err) {
		console.log("Database error: " + err);
		} else {
		message = {
			attachment: {
		type: "template",
		payload: {
			template_type: "generic",
			elements: [{
			title: musicObj.Title,
			subtitle: "Is this the movie you are looking for?",
			image_url: musicObj.Poster === "N/A" ? "http://placehold.it/350x150" : musicObj.Poster,
			buttons: [{
				type: "postback",
				title: "Yes",
				payload: "Correct"
			}, {
				type: "postback",
				title: "No",
				payload: "Incorrect"
			}]
			}]
		}
			}
		};
		sendMessage(userId, message);
		}
	});
		} else {
	console.log(musicObj.Error);
	sendMessage(userId, {text: musicObj.Error});
		}
	} else {
		sendMessage(userId, {text: "Something went wrong. Try again."});
	}
	});
}

function getMusicDetail(userId, field) {
	Music.findOne({user_id: userId},
	function(err, music) {
		if(err) {
	sendMessage(userId, {
		text: "Something went wrong. Try again"});
		} else {
	sendMessage(userId, {text: music[field]});
		}
	});
}

// sends message to user
function sendMessage(recipientId, message) {
	request({
	url: "https://graph.facebook.com/v2.6/me/messages",
	qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
	method: "POST",
	json: {
		recipient: {id: recipientId},
		message: message,
	}
	}, function(error, response, body) {
	if (error) {
		console.log("Error sending message: " + response.error);
	}
	});
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
	return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// Return router
module.exports = router;