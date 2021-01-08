const express = require("express");
const app = express();
const port = 3000;

// 3 different routes that will return 3 different messages
// app.get gets 2 different parameters, first one is the route, and second is the call back function with a request and response (which can be whatever we want). 
// req and res are objects that contain all the information about the HTTP request made that triggered the route, whereas response will contain all the information about what we will respond with.
// Note that '/' is the root path, or the root.
// "/" => "Hi there"
app.get("/", function(req, res){
    // Respond with 'Hi there!'
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    // Respond with 'Hi there!'
    res.send("Goodbye.");
});
// "/dog" => "meow"
app.get("/dog", function(req, res){
    // Respond with 'Hi there!'
    res.send("meow");
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() +" subreddit");
})

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    res.send("Welcome to the comments page");
})

// Star is a catch-all used for any other url besides the routes we have defined above.
app.get("*", function(req, res){
    res.send("You are a star!");
})


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT || port, process.env.IP, function(){
    console.log("Server has started!");
});

