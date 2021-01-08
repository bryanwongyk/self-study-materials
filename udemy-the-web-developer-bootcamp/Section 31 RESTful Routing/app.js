const port        = process.env.PORT || 3000,
    express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

// App config: CONNECT MONGOOSE TO MONGODB CLUSTER
const connectionString = "mongodb+srv://dbAdmin:dbAdminPassword@cluster0-s4upp.mongodb.net/blog?retryWrites=true&w=majority"
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(connectionString, {useNewUrlParser: true});

// Mongoose/model config: If no date is given, then the default date given is now.
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test blog",
//     image: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
//     body: "Hello this is a blog post"
// })

// RESTful routes
// Landing/home page, we want it to go directly to an index
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// INDEX
app.get("/blogs", (req, res) => {
    // Get all blogs
    Blog.find({}, (err, blogs) => {
        if (err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

//CREATE
app.post("/blogs", (req, res) => {
    // sanitise the blog body input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, newBlog) =>{
        if (err){
            res.render("new");
        } else{
            // redirect to the index, which should have the new blog
            res.redirect("/blogs");
        }
    });
});

//NEW
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

//SHOW
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err){
            res.redirect("/blogs");
        } else{
            res.render("show",{blog: foundBlog});
        }
    });
});

//EDIT
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err){
            res.redirect("/blogs");
        } else{
            res.render("edit",{blog: foundBlog});
        }
    });
});

//UPDATE: note that this is a PUT request.
app.put("/blogs/:id", (req, res) => {
    // sanitise the blog body input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Find the existing blog and update the data
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

//DELETE
app.delete("/blogs/:id", (req, res) => {
    // Just callback an error because there is no point returning anything
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

// Listen to server
app.listen(port, process.env.IP, function(){
    console.log("The blog server has started!");
});