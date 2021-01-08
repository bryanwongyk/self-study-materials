// All the middleware goes here. We put in all our methods into an object and then export it out.
// We call this index.js, because if we require a directory, it will automatically look for index.js first, as that is intended to be the 'home' page.

var middlewareObj = {};
const Campground = require('../models/campground');
const Comment = require('../models/comment');

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    };
    // This tells Express to run the error message after we redirect to /login.
    req.flash("errorMsg", "You need to be logged in to do that.");
    res.redirect('/login');
}

// Make each function as independent/encapsulated as possible. Therefore, we make checkCampgroundOwnership separate, rather than relying on isLoggedIn as a dependency.
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // Check if someone is logged in.
    // We do not use isLoggedIn() because we have our own additional code here
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            // Scenario where the found campground is null (i.e. doesnt exist) even if it passes the findById() method.
            if (err || !foundCampground) {
                req.flash("errorMsg", "Campground not found.")
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user._id)){
                    // Check if the current user owns the campground
                    // Note that the document mongoose ID is not a string. It is a Mongoose object. Therefore, we can't use ===, but we can use the Mongoose method .equals()
                    next();
                } else {
                    req.flash("errorMsg", "You don't have permission to do that.")
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash("errorMsg", "You need to be logged in to do that.");
        //back takes the user to the previous page they were on
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // Check if someone is logged in.
    // We do not use isLoggedIn() because we have our own additional code here
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            console.log(foundComment);
            if (err || !foundComment) {
                req.flash("errorMsg", "Comment not found.")
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)){
                    // Check if the current user owns the campground
                    // Note that the document mongoose ID is not a string. It is a Mongoose object. Therefore, we can't use ===, but we can use the Mongoose method .equals()
                    next();
                } else {
                    req.flash("errorMsg", "You don't have permission to do that.")
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash("errorMsg", "You need to be logged in to do that.")
        //back takes the user to the previous page they were on
        res.redirect('back');
    }
}

module.exports = middlewareObj;