const port = 3000;
const express = require("express");
const app = express();
const request = require('request');
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    // The search result is sent to /results
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=87554c17';

    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            console.log(parsedData["Response"]);
            res.render("results", {parsedData: parsedData});
        } else {
            console.log(error);
        };
    });
});

app.get("*", function(req, res){
    res.send("Sorry, page not found!");
});

app.listen(process.env.PORT || port, process.env.IP, function(){
    console.log("Server started!");
});