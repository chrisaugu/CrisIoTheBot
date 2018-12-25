
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Schema = mongoose.Schema;

// Schema
var userSchema = new Schema({
    name:{type: String, required: true},
    gender: {type: String, required : true},
    age: {type: Number, required: true},
    phone: {type: Number, required: true},
    bio: {type: String},
    likes: {type: Number},
    image_url:{type: String}
});

// Return model
const User = module.exports = restful.model('User', userSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
    User.find(callback).limit(limit);
}

// Get User
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

// Add User
module.exports.addUser = (cn_user, callback) => {
    User.create(cn_user, callback);
}

// Update User
module.exports.updateProfile = (id, cn_user, options, callback) =>{
    var query = {_id: id};
    var update = {
        name: cn_user.name,
        gender: cn_user.gender,
        age: cn_user.age,
        phone: cn_user.phone,
        bio: cn_user.bio,
        likes: cn_user.likes,
        image_url: cn_user.image_url
    }
    User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.deleteUser = (id, callback) => {
    var query = {_id: id};
    User.remove(query, callback);
}