const mongoose = require("mongoose"),
    Comment = require('./comment');

// SCHEMA SETUP
var campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// This pre-hook ensures comments are deleted whenever a campground is deleted
// This prehook is triggered by the .remove() method, which is called in the sourcecode. We cannot use findByIdAndRemove() as that does not use .remove() in it's source code.
// Therefore, we have to change that method simply to a findById() and then a remove() in the DESTROY route (campgrounds.js).
campGroundSchema.pre('remove', async function() {
    console.log(this.comments);
    await Comment.remove({
        // remove comments where the id belongs in the given campground document
        _id: {
            $in: this.comments
        }
    });
});

module.exports = mongoose.model("Campground", campGroundSchema);