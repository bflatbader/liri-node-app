// NODE PACKAGES
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var nodeSpotify = require('node-spotify-api');
var colors = require('colors');
var fs = require("fs");
var moment = require('moment');

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
                showTime = moment(response.data[i].datetime);
                
                console.log("VENUE:     ".grey + response.data[i].venue.name);
                logCreate(response.data[i].venue.name);
                console.log("LOCATION:  ".grey + response.data[i].venue.city + ", " + response.data[i].venue.country);
                logCreate(response.data[i].venue.country);
                console.log("DATE:      ".grey + showTime.format("MM/DD/YYYY") + "\n");
                logCreate(showTime.format("MM/DD/YYYY"));
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
                logCreate(response.tracks.items[0].artists[i].name);
            }

            console.log("\nTRACK".red);
            console.log(response.tracks.items[0].name);
            logCreate(response.tracks.items[0].name);

            console.log("\nALBUM".red);
            console.log(response.tracks.items[0].album.name);
            logCreate(response.tracks.items[0].album.name);

            console.log("\nPREVIEW".red);
            console.log(response.tracks.items[0].external_urls.spotify);
            logCreate(response.tracks.items[0].external_urls.spotify);
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
                console.log("\nTITLE:        ".grey + response.data.Title);
                logCreate(response.data.Title);
                console.log("RELEASED:     ".grey + response.data.Year);
                logCreate(response.data.Year);
                console.log("IMDB RATING:  ".grey + response.data.Ratings[0].Value);
                logCreate(response.data.Ratings[0].Value);
                console.log("TOMATOMETER:  ".grey + response.data.Ratings[1].Value);
                logCreate(response.data.Ratings[1].Value);
                console.log("COUNTRY       ".grey + response.data.Country);
                logCreate(response.data.Country);
                console.log("LANGUAGE:     ".grey + response.data.Language);
                logCreate(response.data.Language);
                console.log("PLOT:         ".grey + response.data.Plot);
                logCreate(response.data.Plot);
                console.log("ACTORS:       ".grey + response.data.Actors);
                logCreate(response.data.Actors);
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

function logCreate (string) {
    string = string + "\n";
    fs.appendFile("./log.txt", string, function(err) {

        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
      
      });
      
}

// VARIABLES
var command = process.argv[2];
var searchString = process.argv.slice(3).join(" ");
var stringToLog = command + " " + searchString;

// CODE
runCommands(command, searchString);
logCreate(stringToLog);