// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Schema = mongoose.Schema;

var visitors = restful.model('visitor', new Schema({
    daily: Number,
    monthly: Number
}));

module.exports = visitors;