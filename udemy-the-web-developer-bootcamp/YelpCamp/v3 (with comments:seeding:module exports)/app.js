const port        = process.env.PORT || 3000,
    express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

// CONNECT MONGOOSE TO MONGODB CLUSTER
const connectionString = "mongodb+srv://dbAdmin:dbAdminPassword@cluster0-s4upp.mongodb.net/yelp_camp?retryWrites=true&w=majority"
mongoose.set('useUnifiedTopology', true);
mongoose.connect(connectionString, {useNewUrlParser: true});

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/ben-boyd-national-park/bittangabee-campground/bittangabee-campground-01.jpg",
//         description: "This is a large granite hill..."
//     },
//     function(err, campground){
//         if (err){
//             console.log(err);
//         } else{
//             console.log("Newly created campground: ");
//             console.log(campground);
//         }
//     }
// )

// Landing page
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from the database
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            // Take all the campgrounds we find, and send it to campgrounds.ejs
            res.render("index", {campgrounds: campgrounds});
        }
    });
});

// NEW - show form to create new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/:id", (req, res) => {
    // Find the campground with the provided ID using FindById [Mongoose]
    // Populate the comments for the selected campground so that we can have access to that information later (rather than just references).
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render shows template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
});

app.get("*", function(req, res){
    res.send("Sorry, page not found!");
});

app.listen(port, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});