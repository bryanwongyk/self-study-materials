const express = require('express'),
    Campground    = require("../models/campground"),
    router = express.Router();


// INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from the database
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            // Take all the campgrounds we find, and send it to campgrounds.ejs
            res.render("campground/index", {campgrounds: campgrounds});
        }
    });
});

// NEW - show form to create new campgrounds
router.get("/new", function(req, res){
    res.render("campground/new");
});

// CREATE - add new campground to database
router.post("/", function(req, res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};

    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            //redirect to /campgrounds
            res.redirect("/campgrounds");
        }
    })
});

//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    // Find the campground with the provided ID using FindById [Mongoose]
    // Populate the comments for the selected campground so that we can have access to that information later (rather than just references).
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            //render shows template with that campground
            res.render("campground/show", {campground: foundCampground});
        }
    });
});

module.exports = router;