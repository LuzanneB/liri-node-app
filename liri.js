require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const spotify = require("node-spotify-api");
const moment = require("moment");

// store all of the arguments in an array
let nodeArgs = process.argv
//  create empty variable to hold user input
var userInput = ""
// loop through user entry to generate userInput
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      userInput = userInput + "+" + nodeArgs[i];
    } else {
      userInput += nodeArgs[i];
      }
  }

// create functions for Liri to respond to
    // create function concert-this:
        // this will search BIT API and  return the following about each event:
            // query url ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            // Name of venue
            // venue location
            // date of event (use moment for mm/dd/yyyy format)
    // create function spotify-this-song
        // if there is not song inputed, return info for The Sign by AoB   
        // if song was inputed will search Spotify API and return the following:
            // Artist
            // Song Name
            // A preview link of the song from spotify
            // Album the song is from
      
    // create function movie-this

        // query url "http://www.omdbapi.com/?t=+movie+&y=&plot=short&apikey=trilogy"
        // if there is no movie inputed, search for Mr.Nobody
        // if movie title was inputed, search OMDB API and return:
            // * Title of the movie. - Title
            // * Year the movie came out. - Year
            // * IMDB Rating of the movie. - imdbRating
            // * Rotten Tomatoes Rating of the movie.-response.data.Ratings[1].Value
            // * Country where the movie was produced. -Country
            // * Language of the movie. - Language
            // * Plot of the movie. - Plot
            // * Actors in the movie. - Actors

    // create function do-what-it-says
        // should run spotify-this-son from random.txt