// All the middleware goes here. We put in all our methods into an object and then export it out.
// We call this index.js, because if we require a directory, it will automatically look for index.js first, as that is intended to be the 'home' page.

var middlewareObj = {};
const Campground = require('../models/campground');
const Comment = require('../models/comment');

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
}

// Make each function as independent/encapsulated as possible. Therefore, we make checkCampgroundOwnership separate, rather than relying on isLoggedIn as a dependency.
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // Check if someone is logged in.
    // We do not use isLoggedIn() because we have our own additional code here
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user._id)){
                    // Check if the current user owns the campground
                    // Note that the document mongoose ID is not a string. It is a Mongoose object. Therefore, we can't use ===, but we can use the Mongoose method .equals()
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
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
            if (err) {
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)){
                    // Check if the current user owns the campground
                    // Note that the document mongoose ID is not a string. It is a Mongoose object. Therefore, we can't use ===, but we can use the Mongoose method .equals()
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        //back takes the user to the previous page they were on
        res.redirect('back');
    }
}

module.exports = middlewareObj;