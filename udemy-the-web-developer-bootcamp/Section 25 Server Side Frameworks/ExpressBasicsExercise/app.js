const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    // toLowerCase() makes the input not case sensitive
    var animal = req.params.animal.toLowerCase();
    var animal_sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    };
    res.send("The " + animal + " says '" + animal_sounds[animal] + "'");
});

app.get("/repeat/:phrase/:n", function(req, res){
    var phrase = req.params.phrase + " ";
    var output = "";

    // Convert datatype to number just in case
    for (var n = Number(req.params.n); n > 0; n--){
        output += phrase;
    }
    res.send(output)
});

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
})

// Tell Express to listen for requests (start server)
app.listen(port, process.env.IP, function(){
    console.log("Server has started!");
});

