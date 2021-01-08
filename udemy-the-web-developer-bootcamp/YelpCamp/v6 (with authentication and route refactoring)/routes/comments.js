const express = require('express');
const router = express.Router({mergeParams: true});
const Campground    = require("../models/campground");
const Comment       = require("../models/comment");

//Note we need to import the models that are being used here.
// We also have to import the middleware function isLoggedIn that is in defined for authentication in index.js

// =============================================
// COMMENTS ROUTES
// =============================================
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        // Note that it is unable to find req.params.id because we have split up the files into different route files. 
        // The HTTP request is being sent to app.js, but it is not being re-routed into this comments.js file.
        //Therefore, to fix this we have to add mergeParams as an option for the router, to preserve req.params values from the parent router.
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

// We need isLoggedIn here, because technically anyone could send a POST request e.g. using POSTman to /campgrounds/:id/comments.
// So we want to prevent this from hrouterening unless they are logged in.
router.post("/", isLoggedIn, (req, res) => {
    Comment.create(req.body.comment, (err, comment) => {
        Campground.findById(req.params.id, (err, campground) => {
            if (err){
                console.log(err);
            } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect(`/campgrounds/${req.params.id}`);
            }
        });
    });
});

// TO BE REFACTORED OUT
//Middleware to check if user is logged in 
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
};


module.exports = router;