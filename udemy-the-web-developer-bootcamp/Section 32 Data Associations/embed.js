var mongoose = require("mongoose");
// Trying to connect to a local MongoDB databaseb
mongoose.connect('mongodb://localhost:27017/blog_demo', {useNewUrlParser: true, useUnifiedTopology: true});

// POST SCHEMA
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER SCHEMA
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "hermione@granger.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "Hey",
//     content: "Yo"
// });


// newUser.save((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })

// TO ADD A POST LATER
User.findOne({name:"Hermione Granger"}, (err, user) => {
    // This user returns the user we get when we find Hermione the first one
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title:"Three things i hate",
            content:" Voldemort, Voldemort, Voldemort"
        });
        // This user that returns is the one that we are saving in with the new post into thew MongoDB database
        user.save((err, user) => {
            if(err){
                console.log(err);
            } else{
                console.log(user);
            }
        });
    }
});

// var newPost = new Post({
//     title: "Reflections on apples",
//     content: "They are delicious"
// })
// newPost.save((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// Embed data inside