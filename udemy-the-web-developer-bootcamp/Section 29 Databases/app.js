
// FROM MONGOOSE DOCUMENTATION
// STEP 1. CONNECT MONGOOSE TO MONGODB CLUSTER
const connectionString = "mongodb+srv://dbAdmin:dbAdminPassword@cluster0-s4upp.mongodb.net/cats_app?retryWrites=true&w=majority"

const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect(connectionString, {useNewUrlParser: true});

// STEP 2: CREATE SCHEMA: We are just creating a template, however this does not mean we cannot add or change properties (as MongoDB is noSQL)
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// STEP 3: COMPILE SCHEMA INTO MODEL
var Cat = mongoose.model("Cat", catSchema);

// Add a cat to a database.
// Mongoose automatically creates collection for us by making Schema plural e.g. cat to cats, person to people
// Note that we can change the properties of George to anything and we can add that cat to our database. What we see on the JavaScript side is different frmo what is
// actually in the database.

// Using new() and save()

// var george = new Cat({
//   name: "Helen",
//   age: 5,
//   temperament: "Calm"
// });

// george.save(function(err, cat){
//   if (err){
//     console.log("Something went wrong!");
//   } else{
//     console.log("WE JUST SAVED A CAT TO THE DATABASE!");
//     console.log(cat);
//   }
// });


// Using create()
Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Bland"
}, function(err, cat){
  if (err){
    console.log(err);
  } else{
    console.log(cat);
  };
});

//Retrieve all cats from the DB and console.log each one. Call back function just in case there is an error.
Cat.find({}, function(err, cats){
  if (err){
    console.log("Oh no, error!");
    console.log(err);
  } else{
    console.log("All the cats:");
    console.log(cats);
  };
});