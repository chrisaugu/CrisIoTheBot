// Dependencies
var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var productSchema = new Schema({
    name: String,
    sku: String,
    desc: String,
    price: Number,
    status: String,
    date_added: { type: Date, default: Date.now() }
});

// Return model
module.exports = restful.model('product', productSchema);