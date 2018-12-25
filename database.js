const mongoose = require("mongoose");

// Connect to MongoDB Database
process.env.MONGODB_URI;
const db = mongoose.connect(process.env.DATABASE_URL);

module.exports = db;