const port        = process.env.PORT || 3000,
    express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    passport      = require("passport"),
    LocalStrategy               = require('passport-local'),
    passportLocalMongoose       = require('passport-local-mongoose');

const commentRoutes               = require('./routes/comments');
const campgroundRoutes                = require('./routes/campgrounds');
const indexRoutes                      = require('./routes/index');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

// CONNECT MONGOOSE TO MONGODB CLUSTER
const connectionString = "mongodb+srv://dbAdmin:dbAdminPassword@cluster0-s4upp.mongodb.net/yelp_camp?retryWrites=true&w=majority"
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    // Random secret string
    secret: 'nbZaLi8sIb',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create a variable which we can pass to verify if a user is already logged in. This will allow us to modify the navbar and the signup/login/logout buttons accordingly.
// This will be currentUser which we will pass in.
// If no user is logged in, req.user will be undefined. If they are logged in, this will be the User item in the database.
// Have the variable currentUser available on every single route so that we can check if the user is logged in on every route.
// We will add our own middleware to app.use(), such that any function we pass into it will be run on every single route before the callback.
app.use((req, res, next) => {
    // Whatever we put into res.locals will be available inside our template/.ejs file.
    // So now we can refer to this simply as 'currentUser' (we don't have to do res.locals.currentUser) in all our templates (.ejs) files!
    // This could be any name, it does not have to be the same variable name as what we passed into /campgrounds.
    // Note that req.user is information given by Passport
    res.locals.currentUser = req.user;
    // If the user is not logged in, next() will not do anything. If the user is logged in, this will run the next middleware, which is the route callback handler in most cases.
    next();
});

// Landing page
app.get("/", function(req, res){
    res.render("landing");
});

// To DRY (Do not Repeat Yourself) up the code, we can add the first option, which tells us e.g. in the campGrounds route, we want to append "/campgrounds to all of them."
// This is because e.g. in the campground routes we might notice that all the routes start with /campgrounds. So doing this removes repeated '/campgrounds' in the code.
// e.g. '/campgrounds' will just become '/'
// indexRoutes with '/' is to just keep consistency
// So, app.js is now the 'parent router', where HTTP requests go and then get routed to their respective routes.
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.get("*", function(req, res){
    res.send("Sorry, page not found!");
});

app.listen(port, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});