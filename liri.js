// NODE PACKAGES
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var nodeSpotify = require('node-spotify-api');
var colors = require('colors');
var fs = require("fs");

// FUNCTIONS

// Run Commands
function runCommands (command, searchString) {
    // Determine which command was entered and call the appropriate function
    switch(command) {
        case "concert-this":
            concertThis(searchString);
            break;

        case "spotify-this-song":
            spotify(searchString);
            break;

        case "movie-this":
            movieThis(searchString);
            break;

        case "do-what-it-says":
            doRandomFromFile();
            break;
    }
}

// concert-this
function concertThis (artist) {

    console.log("\n" + artist.toUpperCase().red + "\n");

    bandsInTownURL = "https://rest.bandsintown.com/artists/" + encodeURIComponent(artist) + "/events?app_id=codingbootcamp"

    axios.get(bandsInTownURL).then(
        function(response) {
            for (i in response.data) {
                console.log("VENUE:     ".grey + response.data[i].venue.name.underline);
                console.log("LOCATION:  ".grey + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("DATE/TIME: ".grey + response.data[i].datetime + "\n");
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
            console.log(response.tracks.items[0].name);

            console.log("\nALBUM".red);
            console.log(response.tracks.items[0].album.name);

            console.log("\nPREVIEW".red);
            console.log(response.tracks.items[0].external_urls.spotify);
        })
        .catch(function(err) {
            console.log(err);
        });
}

// movie-this
function movieThis (title) {
    if (title) {
        // A movie title was provided, do nothing
    } else {
        // No movie title was provided, default to "Mr. Nobody"
        title = "mr nobody"
    }
    
    omdbURL = "https://www.omdbapi.com/?t=" + encodeURIComponent(title) + "&plot=short&apikey=trilogy";

    axios.get(omdbURL).then(
        function(response) {
                console.log("\nTITLE:        ".yellow + response.data.Title);
                console.log("RELEASED:     ".yellow + response.data.Year);
                console.log("IMDB RATING:  ".yellow + response.data.Ratings[0].Value);
                console.log("TOMATOMETER:  ".yellow + response.data.Ratings[1].Value);
                console.log("COUNTRY       ".yellow + response.data.Country);
                console.log("LANGUAGE:     ".yellow + response.data.Language);
                console.log("PLOT:         ".yellow + response.data.Plot);
                console.log("ACTORS:       ".yellow + response.data.Actors);
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

// do-what-it-says
function doRandomFromFile () {
    fs.readFile("./random.txt", "utf8", function(error, command) {
        if (error) {
            return console.log(error);
          }
        
        command = command.split(",");
        runCommands(command[0], command[1]);
    });
}

// VARIABLES
var command = process.argv[2];
var args = process.argv;
var searchString = process.argv.slice(3).join(" ");

// CODE
runCommands(command, searchString);