require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const spotify = require("node-spotify-api");
const moment = require("moment");

// store all of the arguments in an array
let nodeArgs = process.argv
//  create empty variable to hold user input
let userInput = ""
// loop through user entry to generate userInput
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      userInput = userInput + "+" + nodeArgs[i];
    } else {
      userInput += nodeArgs[i];
      }
  }

 // create function movie-this
        // query url
let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

function movie-this(){
// if there is no movie inputed, search for Mr.Nobody
    if (userInput===""){
        let userInput = "Mr.Nobody"
    }
 // if movie title was inputed, search OMDB API and return:
    axios.get(queryUrl).then(
        function(response) {
        // * Title of the movie. - Title
            console.log("Title: " + response.data.Title);
         // * Year the movie came out. - Year
            console.log("Release Year: "+ response.data.Year);            
        // * IMDB Rating of the movie. - imdbRating
            console.log("IMDB Rating: "+ response.data.imdbRating);    
        // * Rotten Tomatoes Rating of the movie.-response.data.Ratings[1].Value
            console.log("Rotten Tomatoes Rating: "+ response.data.Ratings[1].Value);    
        // * Country where the movie was produced. -Country
            console.log("Country: "+ response.data.Country);    
        // * Language of the movie. - Language
            console.log("Language: "+ response.data.Language);    
        // * Plot of the movie. - Plot
            console.log("Plot: "+ response.data.Plot);    
        // * Actors in the movie. - Actors
            console.log("Plot: "+ response.data.Actor);    
        })

};
        
       
           
         
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
      
   
    // create function do-what-it-says
        // should run spotify-this-son from random.txt