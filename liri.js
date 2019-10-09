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

// spotify-this-song
function spotify (song) {

    if (song) {
        // A song was provided, do nothing
    } else {
        // No song was provided, default to "The Sign"
        song = "the sign ace of base"
    }

    spotify = new nodeSpotify(keys.spotify);
    
    spotify.search({ type: 'track', query: song, limit: 1 })
        .then(function(response) {
            
            console.log("\nARTISTS".red);

            for (i in response.tracks.items[0].artists) {
                console.log(response.tracks.items[0].artists[i].name)
            }

            console.log("\nTRACK".red);
            console.log(response.tracks.items[0].album.name);

            console.log("\nALBUM".red);
            console.log(response.tracks.items[0].name);

            console.log("\nPREVIEW".red);
            console.log(response.tracks.items[0].external_urls.spotify);
        })
        .catch(function(err) {
            console.log(err);
        });
}


// VARIABLES
var command = process.argv[2];
var args = process.argv;
var searchString = process.argv.slice(3).join(" ");

// Determine which command was entered and call the appropriate function
switch(command) {
    case "concert-this":
        concertThis(searchString);
        break;

    case "spotify-this-song":
        spotify(searchString);
        break;

    case "movie-this":
        // code
        break;

    case "do-what-it-says":
        // code
        break;
}