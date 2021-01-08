const express = require('express');
const router = express.Router({mergeParams: true});
const Campground    = require("../models/campground");
const Comment       = require("../models/comment");
const middleware    = require("../middleware/index.js");

//Note we need to import the models that are being used here.
// We also have to import the middleware function isLoggedIn that is in defined for authentication in index.js

// =============================================
// COMMENTS ROUTES
// =============================================
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        // Note that it is unable to find req.params.id because we have split up the files into different route files. 
        // The HTTP request is being sent to app.js, but it is not being re-routed into this comments.js file.
        //Therefore, to fix this we have to add mergeParams as an option for the router, to preserve req.params values from the parent router.
        if (err || !foundCampground) {
            req.flash("errorMsg", "Campground not found.")
            res.redirect('back');
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

// We need isLoggedIn here, because technically anyone could send a POST request e.g. using POSTman to /campgrounds/:id/comments.
// So we want to prevent this from hrouterening unless they are logged in.
router.post("/", middleware.isLoggedIn, (req, res) => {
    Comment.create(req.body.comment, (err, comment) => {
        Campground.findById(req.params.id, (err, campground) => {
            if (err || !campground){
                // If something ever goes wrong with the database!
                req.flash("errorMsg", "Campground not found.")
                res.redirect('back');
            } else {
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // save comment with new info about the user, since the Comment.create earlier did not contain this information.
                comment.save();
                //save comment
                campground.comments.push(comment);
                campground.save();
                req.flash("successMsg", "Successfully added comment!")
                res.redirect(`/campgrounds/${req.params.id}`);
            }
        });
    });
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err || !foundCampground){
            req.flash("errorMsg", "Campground not found.")
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err || !comment) {
                req.flash("errorMsg", "Comment not found.")
                res.redirect('back');
            } else{
                res.render('comments/edit', {campground_id: req.params.id, comment: comment});
            }
        });
    });
});

//UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err || !updatedComment){
            req.flash("errorMsg", "Comment not found.")
            res.redirect('back');
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

//DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('back');
        } else {
            req.flash("successMsg", "Comment deleted")
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

module.exports = router;