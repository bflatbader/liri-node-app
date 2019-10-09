require("dotenv").config();
var keys = require("./keys.js");
var nodeSpotify = require('node-spotify-api');

// Define keys for Spotify API
var spotify = new nodeSpotify({
    id: '3c99faab3e1843d395987fe86a73d1cc',
    secret: '524a02087eb94d09ae1a27be7edcdfbb'
});

var command = process.argv[2];
var args = process.argv;

switch(command) {
    case "concert-this":
        // code
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