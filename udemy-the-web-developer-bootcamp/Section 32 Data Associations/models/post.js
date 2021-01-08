var mongoose = require("mongoose");

// POST SCHEMA
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postSchema);