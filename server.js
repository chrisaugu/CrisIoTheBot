const http = require('http');
require("dotenv").config();

let app = require('./app');

const httpServer = http.createServer(app);
httpServer.listen(app.get('port'), '0.0.0.0', function () {
	console.log(`API running on http://${this.address().address}:${this.address().port}`);
});