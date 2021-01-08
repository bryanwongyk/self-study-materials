const express                   = require('express'),
    port                        = (process.env.PORT || 3000),
    app                         = express(),
    mongoose                    = require('mongoose'),
    passport                    = require('passport'),
    bodyParser                  = require('body-parser'),
    LocalStrategy               = require('passport-local'),
    passportLocalMongoose       = require('passport-local-mongoose'),
    User                        = require('./models/user');
    
mongoose.connect('mongodb://localhost:27017/auth_demo_app', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//NEED THESE LINES
// Technically we need to do require('express-session'), but this is an alternate way in which we can require, use the package, and run a call-back function.
// We need 3 options for express-session
app.use(require('express-session')({
    // secret is a few english words/a sentence, which is used to encode and decode sessions.
    secret: "Bryan is awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// THis tells passport that we want to use the local strategy given by passport-local-mongoose to authenticate.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Encoding/serialising user information into the HTTP request.
passport.deserializeUser(User.deserializeUser()); // Takes data from the session and deserializes/decodes it to see if someones logged in or not.

// =================
// Routes
// =================

app.get('/', (req, res) => {
    res.render("home");
});

// /secret is only visible if we properly authenticate
app.get('/secret', isLoggedIn, (req, res) => {
    res.render("secret");
});


// =================
// AUTH ROUTES
// =================
app.get('/register', (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    //User.register will take this new User with a username, then hash the password which is the second argument, and then it will return a new user with everything inside of it with the username and password in the callback function.
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err){
            console.log(err);
            res.render('register');
        } else {
            // .authenticate will verify and try to log the user in, it will store the correct information, it will run the serializeUser method we defined in line 26 above.
            // We are specifying we want to use the 'local' strategy i.e. logging in with username/password. There are other types of strategies we can do if we install them like facebook, twitter etc.
            passport.authenticate("local")(req, res, () => {
                // Once the user is logged in, we can redirect them to the secret page.
                res.redirect('/secret');
            });
        }

    });
});

// LOGIN ROUTES
// Render login form
app.get("/login", (req, res) => {
    res.render("login");
});

//Login logic
// Here the user exists already so all we have to do is authenticate that they exist. Whereas in /register, we have to make the user first and THEN, authenticate they exist to log them in. 
// the use of passport.authenticate here is known as a middleware. It is some code that runs before our final route callback. 
// WHen the app gets the post request, it runs the middleware code IMMEDIATELY, THEN at the end of the route it runs the callback function.
app.post("/login", passport.authenticate('local', {
    // If the authenticate works, then it will redirect to either the successful or failure route.
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
});

app.get("/logout", (req, res) => {
    // Nothing is changing in the database when we logout.
    // All this does is that, Passport will delete all information about the user in the current session.
    req.logout();
    // Once we logout, redirect to the home page.
    res.redirect("/");
});

// isLoggedIn middleware
function isLoggedIn (req, res, next) {
    // run the next function if the user is logged in, otherwise redirect them back to the login page.
    if (req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
};


app.listen(port, process.env.IP, () => {
    console.log("Server started!");
});