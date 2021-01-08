const mongoose = require("mongoose");

// SCHEMA SETUP
// Remember that each user in the database is stored in with their unique mongoDB ID, username, hash, and salt. We don't need all this information, so the comment can just have the id and username.
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        // we want just a reference to the actual user itself, which we can populate to get later.
        // but we want a copy of the username as a string so that we can print it out whenever we want.
        id: {
            type: mongoose.Schema.Types.ObjectId,
            // ref is the Model we are referring to
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);