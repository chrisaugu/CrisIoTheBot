module.exports = function(app, passport) {

    app.get('/sms', (req, res) => {
        const SMS_API_URL = "https://api.smsapi.com/sms.do";
        
        const TXT_LOCAL_API_URL = "https://api.txtlocal.com/send/?";
        const TXT_LOCAL_API_KEY = 'bGfYO6rYTE0-En1wksvmeVwz1zlz5TBxKAQdQ1ZNKi'; 

        var txtlocal_url = `${TXT_LOCAL_API_URL}apiKey=${TXT_LOCAL_API_KEY}&message="This is your message"&sender=Christian&numbers=67570523228`;

        var txtlocal_opts = {
            url: TXT_LOCAL_API_URL,
            body: {
                number: '67570523228',
                message: 'Hello World',
                apikey: TXT_LOCAL_API_KEY,
                sender: 'Christian'
            }
        };

        // var data = {
        //     'apikey': 'apikey',
        //     'numbers': '447123456789',
        //     'message': 'This is your message',
        //     'sender': 'Jims Autos'
        // };

        request.post(txtlocal_opts, function(err, resp, body){
            if (err) {
                console.log("Error: " + err);
            } else if (resp) {
                try {
                    var payload = JSON.parse(body);
                    console.log(payload);
                } catch(e) {
                    console.log("Error: " + e);
                }
            } else {
                console.log("Error: " + new Error('an unknown error occurred'));
            }
        })
        
        const SMS_GATEWAY_URL = "https://secure.smsgateway.ca/services/message.svc/";
        
        const TXTBELT_URL = "http://textbelt.com/text";
        // http://textbelt.com/text?number=67570523228&message=hello&key=textbelt
        // http://textbelt.com/status/:textId
        var f = {
            "messages": [{
                "from": "from",
                "destinations": [{
                    "messageId": "messageId",
                    "to": "to"
                }],
                "text": "text",
                "notifyUrl": "notifyUrl",
                "notifyContentType": "notifyContentType",
                "callbackData": "callbackData"
            }]
        }
        // var body = "number="+number+"&message="+msg;
        var options = {
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url: 'http://textbelt.com/text',
          body: {
            number: '+67570523228',
            message: 'Hello World',
            key: 'textbelt',
          }
        };

        request.post(options, function(err, resp, body){
          if (err) {
            console.log("Error: " + err);
          } else if (resp) {
            try {
              var payload = JSON.parse(body);
              console.log(payload);
            }
            catch(e) {
                console.log("Error: " + e);
            }
          } else {
            console.log("Error: " + new Error('an unknown error occurred'));
          }
        });

        // var options = { method: 'POST',
        //     url: 'http://www.sendanonymoussms.com/send.php',
        //     body: { 
        //         name: '70523228',
        //         country: '+675',
        //         ReceiverNumber: '70523228',
        //         message: 'hello' 
        //     }
        // };

        // var options = { method: 'POST',
        //     url: SMS_API_URL,
        //     headers: 
        //         { 'Authorization': 'Bearer access_token',
        //           'Content-Type': "application/json;charset=UTF-8",
        //           'Content-Type': 'application/x-www-form-urlencoded' },
        //     body: 
        //         { from: '67570523228',
        //           to: '67570523228',
        //           message: 'Hello world',
        //           format: 'json' },
        //     json: true 
        // };

        // request(options, function (error, response, body) {
        //     if (error) {
        //         console.log('Error:', error);
        //         return;
        //     }
        //     res.send(body);
        // });
    });

    app.get('/sms/send', (req, res) => {
        let { phone, message } = req.query;
        res.json(req.query);

        const SMS = require('node-sms-send');
        const sms = new SMS('username', 'password');
        sms.send('+67570523228', 'Hello!')
           .then(body => {
            console.log(body) // returns { message_id: 'string' }
            sms.status(body.message_id)
                .then(body => {
                    console.log(body) // returns { phone_number: '+67570523228', status: 'sent' }
                    console.log("Message sent successfully to " + body.phone_number)
                })
                .catch(err => console.log(err.message));
           })
           .catch(err => console.log(err.message));
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/connect'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
