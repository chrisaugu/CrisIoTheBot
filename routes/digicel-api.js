"use strict";
// let api = exports = module.exports = require('express').Router();

module.exports = function(api) {

	api.get('/digicel', function(req, res, next) {
		res.send('Digicel\'s public API is available');
	});

	return api;
};