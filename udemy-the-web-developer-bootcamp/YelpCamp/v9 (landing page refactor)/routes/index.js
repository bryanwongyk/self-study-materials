const express = require('express'),
    router = express.Router(),
    passport      = require("passport"),
    User          = require("../models/user");
    
// =============================================
// AUTH ROUTES
// =============================================
router.get("/register", (req, res) => {
    res.render("register");
});
router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    //User.register will take this new User with a username, then hash the password which is the second argument, and then it will return a new user with everything inside of it with the username and password in the callback function.
    User.register(newUser, req.body.password, (err, user) => {
        if (err){
            req.flash('errorMsg', err.message);
            res.redirect('/register');
        } else {
            // .authenticate will verify and try to log the user in, it will store the correct information, it will run the serializeUser method we defined in line 26 above.
            // We are specifying we want to use the 'local' strategy i.e. logging in with username/password. There are other types of strategies we can do if we install them like facebook, twitter etc.
            passport.authenticate("local")(req, res, () => {
                // Once the user is logged in, we can redirect them to the campgrounds page
                req.flash('successMsg', `Welcome to YelpCamp, ${user.username}`);
                res.redirect('/campgrounds');
            });
        }
    });
})
//Login route
router.get('/login', (req, res) => {
    // We pass the flash message to be printed
    res.render("login");
});
router.post("/login", passport.authenticate('local', {
    // Here the user exists already so all we have to do is authenticate that they exist. Whereas in /register, we have to make the user first and THEN, authenticate they exist to log them in. 
    // If the authenticate works, then it will redirect to either the successful or failure route.
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
});
//Logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('successMsg', "Logged you out");
    res.redirect('/campgrounds');
})

module.exports = router;