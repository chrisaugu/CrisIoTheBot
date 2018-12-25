"use strict";
module.exports = function(api) {

/**
 * GET /webhook
 * Facebook Webhook Endpoints
 * Used for messenger verification
 */ 
api.get('/webhook', function(request, response) {
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
api.post("/webhook", function (req, res) {
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

return api;
};