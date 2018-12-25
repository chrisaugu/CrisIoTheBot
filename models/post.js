
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Schema = mongoose.Schema;

// Schema
var postSchema = new Schema({
    post_id:{type: String},
    user_name: {type: String},
    user: {type: String},
    user_link: {type: String},
    user_display_name: {type: String},
    post_details: {type: Number, required: true},
    reaction:{
        likes: {type: Number},
        love: {type: Number},
        wow: {type: Number},
        laught: {type: Number},
        sad: {type: Number},
        angry: {type: Number}
    },
    share: {type: Number},
    link_url: {type: String},
    image_url:{type: String}
});

// Return model
const Post = module.exports = mongoose.model('Post', postSchema);

// Get Post
module.exports.getPosts = (callback, limit) => {
    Post.find(callback).limit(limit);
}

// Get Post
module.exports.getPostById = (id, callback) => {
    Post.findById(id, callback);
}

// Add Post
module.exports.addPost = (post, callback) => {
    Post.create(post, callback);
}

// Update Post
module.exports.updatePost = (id, post, options, callback) =>{
    var query = {_id: id};
    var update = {
        post_id: post.post_id,
        post_user_name : post.user_name,
        post_user: post.user,
        post_user_link: post.user_link,
        post_details: post.post_details,
        post_reaction: post.reaction,
        post_link: post.link_url,
        post_shares: post.share,
        post_image_url: post.image_url
    }
    Post.findOneAndUpdate(query, update, options, callback);
}

// Delete Post
module.exports.deletePost = (id, callback) => {
    var query = {_id: id};
    Post.remove(query, callback);
}