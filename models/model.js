// Dependencies
const restful = require('node-restful');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Return model
module.exports = {
	// Attaching schema to model
	// Translate model
	Translate: restful.model("translator", new Schema({
	    user_id: { type: String},
	    english_word: {type: String},
	    translated_word: {type: String}
	})),
	// Music model
	Music: restful.model("music", new Schema({
	  user_id: {type: String},
	  title: {type: String},
	  artist: {type: String},
	  album: {type: String},
	  date_released: {type: String},
	  duration: {type: String},
	  poster_url: {type: String}
	})),
	// Teacher model
	Teacher: restful.model("teacher", new Schema({
	    subject: String,
	    lesson: String,
	    topic: String
	}))
};