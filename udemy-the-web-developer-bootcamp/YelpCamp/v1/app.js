const port = 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg"},
    {name: "Granite Hill", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/ben-boyd-national-park/bittangabee-campground/bittangabee-campground-01.jpg"},
    {name: "Mountain Goat's Rest", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/new-england-national-park/thungutti-campground/thunhgutti-campground-01.jpg"},
    {name: "Salmon Creek", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg"},
    {name: "Granite Hill", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/ben-boyd-national-park/bittangabee-campground/bittangabee-campground-01.jpg"},
    {name: "Mountain Goat's Rest", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/new-england-national-park/thungutti-campground/thunhgutti-campground-01.jpg"},
    {name: "Salmon Creek", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg"},
    {name: "Granite Hill", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/ben-boyd-national-park/bittangabee-campground/bittangabee-campground-01.jpg"},
    {name: "Mountain Goat's Rest", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/new-england-national-park/thungutti-campground/thunhgutti-campground-01.jpg"}

];

// Landing page
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// REST convention
app.post("/campgrounds", function(req, res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};

    campgrounds.push(newCampground);
    //redirect to /campgrounds
    res.redirect("/campgrounds");
});

app.get("*", function(req, res){
    res.send("Sorry, page not found!");
});

app.listen(process.env.PORT || port, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});