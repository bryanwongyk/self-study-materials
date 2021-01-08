var mongoose = require("mongoose");
// Trying to connect to a local MongoDB databaseb
mongoose.connect('mongodb://localhost:27017/blog_demo2', {useNewUrlParser: true, useUnifiedTopology: true});

// Import models
var User = require('./models/user');
var Post = require('./models/post');

// User.create({
//     email: 'bob@gmail.com',
//     name: 'bob belcher'
// });

// Post.create({
//     title: "How to cook the best burger part 4",
//     content: "blah blah blah"
// }, (err, post) => {
//     User.findOne({name: "bob belcher"}, (err, foundUser) => 
//         {
//             if(err){
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save((err, data) => {
//                     if (err){
//                         console.log(err);
//                     } else{
//                         console.log(data);
//                     }
//                 });
//             }
//         })
//     }
// );

// To access/find the data
User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
    if (err) {
        console.log(err);
    } else{
        console.log(user);
    }
});
