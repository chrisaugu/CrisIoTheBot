const restful = require('node-restful');
const router = require('express').Router();

let Product = restful.model('product');
let User = restful.model('user');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.route('')
Product.register(router, '/products');

User.methods(['get', 'put', 'post', 'delete']);
// User.before('post', hash_password).before('put', hash_password); 
User.route('login.post', function(req, res, next) {
	User.find({
		username: req.body.username,
		password: req.body.password
	})
	.select("username password")
	.exec()
	.then(function(success) {
		res.json(success);
	})
	.catch(function(error) {
		res.send(error);
	})
});
User.route('signup', ['post'], function(req, res, next) {
	User.find({
		phone: req.body.phone,
		username: req.body.username,
	})
	.select("username password")
	.exec()
	.then(function(success) {
		if (success && success.length) {
			res.json(success)
		} else {
			var newUser = req.body;
			User.create(newUser, function(err, result) {
				if (err) console.log(err);
				res.sendStatus(200);
			});
		}
	})
	.catch(function(error) {
		res.send(error);
	})
});

User.register(router, '/users');

function hash_password(req, res, next) {
	req.body.password = hash(req.body.password);
	next();
}

module.exports = router;