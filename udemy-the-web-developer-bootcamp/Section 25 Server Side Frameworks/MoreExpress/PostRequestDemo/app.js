const port = 3000;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// Note: that whenever we reload the page, the friends list will reset. However, when we learn about databases we will not have to worry about this.
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

// Body parser transfroms anything that is URL encoded from string to a JS object that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

// This tells express that we do not have to write .ejs for each site e.g. home.ejs, friends.ejs. it automatically does it for us.
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    // Extract the input given by the user from req.body with the help of the body-parser package
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT || port, process.env.IP, function(){
    console.log("Server started!");
});