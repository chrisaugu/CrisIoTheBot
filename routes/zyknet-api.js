module.exports = function(api) {
	api.get('/zyknet', function(req, res) {
		res.json({
			name: 'kitten'
		})
	})
	return api;
};