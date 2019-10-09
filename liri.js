// NODE PACKAGES
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var nodeSpotify = require('node-spotify-api');
var colors = require('colors');

// FUNCTIONS

// concert-this
function concertThis (artist) {

    console.log("===============".red);
    console.log(artist.toUpperCase().red);
    console.log("===============\n".red);

    bandsInTownURL = "https://rest.bandsintown.com/artists/" + encodeURIComponent(artist) + "/events?app_id=codingbootcamp"

    axios.get(bandsInTownURL).then(
        function(response) {
            for (i in response.data) {
                console.log(response.data[i].venue.name.underline);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log(response.data[i].datetime + "\n");
            }
        

        })
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
        });        
}

// VARIABLES
var spotify = new nodeSpotify({
    id: '3c99faab3e1843d395987fe86a73d1cc',
    secret: '524a02087eb94d09ae1a27be7edcdfbb'
});

var command = process.argv[2];
var args = process.argv;
var searchString = process.argv.slice(3).join(" ");

// Determine which command was entered
switch(command) {
    case "concert-this":
        concertThis(searchString);
        break;

    case "spotify-this-song":
        // code
        break;

    case "movie-this":
        // code
        break;

    case "do-what-it-says":
        // code
        break;
}