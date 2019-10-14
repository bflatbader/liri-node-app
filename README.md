[![Generic badge](https://img.shields.io/badge/Portfolio-Red.svg)](https://bflatbader.github.io/)
[![Generic badge](https://img.shields.io/badge/LinkedIn-Blue.svg)](https://www.linkedin.com/in/bishop-bader/)

<p align="center">
    <img src="images/liriLogo.jpg" alt="Logo"><br>
    <a href="https://drive.google.com/file/d/1bvYRMY36ktTMcMObd2vY-AoIRs56S0uG/view" target="blank">View Demo</a><br>
</p>


## Overview
A CLI bot that allows you to search Bands In Town for upcoming concerts, OMDB for information about movies, and spotify for information about songs.

## Languages/Technologies Used
- [Node](https://nodejs.org/en/docs/)
    - [Axios](https://www.npmjs.com/package/axios)
    - [DotEnv](https://www.npmjs.com/package/dotenv)
    - [Moment](https://www.npmjs.com/package/moment)
    - [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
    - [Colors](https://www.npmjs.com/package/colors)

- APIs
    - [OMDB](http://omdbapi.com/)
    - [Bands In Town](https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0)

## Getting Started

### Prerequisites
Have [Node](https://nodejs.org/en/download) installed and run via command line.

### Installation
1. Clone the repo: 
```sh
git clone https://github.com/bflatbader/liri-node-app.git
```
2. Install NPM packages:
```sh
npm install
```

## Usage

App Command | Short Description
------------|-------------------
**concert-this**      | Searches Bands In Town for an artist's events
**spotify-this-song** | Searches Spotify for information about a song
**movie-this**        | Searches OMDB for information about a movie
**do-what-it-says**   | Runs the command in random.txt

### concert-this
#### Description
This command will search the Bands In Town events API for a band or artist that the user enters, then returns the following information about each event to the terminal:
- Name of the venue
- Venue location
- Date of the event

#### Example
```sh
node liri.js concert-this <band>
```
![concert-this Example](/images/concert-this.jpg)

### spotify-this-song
#### Description
This command will retrieve information about a song that the user enters and then returns the following information about the song to the terminal:
- Artist(s)
- The song's name
- The album the song is from
- A preview link to Spotify

#### Example
```sh
node liri.js spotify-this-song <song name>
```
![spotify-this Example](/images/spotify-this.jpg)

### movie-this
#### Description
This command will search the OMDB API for a movie title that the user enters, then returns the following information about the movie title to the terminal:
- Title of the movie
- Release year
- IMDB rating
- Tomatometer rating
- Country where the movie was produced
- Language of the movie
- Plot of the movie
- Actors in the movie

#### Example
```sh
node liri.js movie-this <movie title>
```
![movie-this Example](/images/movie-this.jpg)

### do-what-it-says
#### Description
This command will retrieve the text from the inside of random.txt and then use it to call one of LIRI's commands.

#### Example
```sh
node liri.js do-what-it-says
```