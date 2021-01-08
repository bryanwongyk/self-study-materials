const express = require('express'),
    Campground    = require("../models/campground"),
    router = express.Router();
const middleware    = require("../middleware/index.js");


// INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from the database
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            // Take all the campgrounds we find, and send it to campgrounds.ejs
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

// NEW - show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// Add isLoggedIn() to prevent people trying to send a POST request to just /campgrounds
// CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, (req, res) =>{
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    // THis is a different way (and slightly cleaner) of adding the author. Comments.js shows another way in which ._id and username are pushed and saved later.
    var newCampground = {name: name, image: image, description: desc, author: author};

    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            campground.save();
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
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT ROUTE
// example of using async functions instead of callbacks
router.get("/:id/edit", middleware.checkCampgroundOwnership, async function(req, res) {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err){
            res.redirect('back');
        } else{
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});
 

//UPDATE ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err){
            res.redirect('/campgrounds');
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        };
    })
});

//DESTROY ROUTE
// these callbacks could probably be converted into async functions
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            // this remove() will remove the campground, but also trigger the pre-hook that removes all associated comments in campground.js
            foundCampground.remove((err) => {
                if (err){
                    res.redirect('/campgrounds');
                } else {
                    res.redirect('/campgrounds');
                }
            })
        };
    });
});

module.exports = router;