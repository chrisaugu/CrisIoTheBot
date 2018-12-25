
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Schema = mongoose.Schema;

// Schema
var userSchema = new Schema({
    name: {type: String},
    phone: {type: Number, unique: true},
    email: {type: String},
    username: {type: String, unique: true},
    password: {type: String},
    bio: {type: String},
    sellers: [{
        type: Schema.ObjectId,
        ref: 'user'
    }],
    buyers: [{
        type: Schema.ObjectId,
        ref: 'user'
    }],
    products: [{
        type: Schema.ObjectId,
        ref: 'product',
        unique: true
    }],
    visits: Number, // records the number of visits
});

// Return model
module.exports = restful.model('user', userSchema);