require("dotenv").config();
const fs = require ("fs");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];

 // create function movie-this to take in input
function movieThis(){

    // store all of the arguments in an array
    let userInput = process.argv.slice(3).join("+");
    // if there is no movie inputed, search for Mr.Nobody

    // queryURL
    let queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  
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
    .catch(function(err) {
        console.log(err);
            });
// close function
};
            
           
         
// create functions for Liri to respond to
    // create function concert-this:
function concertThis(){

    let userInput = process.argv.slice(3).join("%20");
      // this will search BIT API for an artist and  return the following about each event:
    queryUrl=("https://rest.bandsintown.com/artists/"+userInput+"/events?app_id=codingbootcamp")
    
  
    axios.get(queryUrl).then(
        function(response) {
        // Name of Venue
            console.log("Venue: " + response.data[0].venue.name);
        // venue location
            console.log("City, Country: " + response.data[0].venue.city +", "+ response.data[0].venue.country);
        // date of event (use moment for mm/dd/yyyy format)
            console.log("Event Date: "+ moment(response.data[0].datetime).format("MM DD YYYY"));
        })
    .catch(function(err) {
        console.log(err);
          });
    
// close function
};
      
        

    // create function spotify-this-song
function spotifyThisSong(){
    let userInput = process.argv.slice(3).join(" ");

    spotify.search({ type: 'track', query: userInput, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    // Artist Name
        console.log("Artist Name: "+ data.tracks.items[0].artists[0].name); 
    // Song Name
        console.log("Song Name: "+ data.tracks.items[0].name); 
    // A preview link of the song from spotify
        console.log("Preview Link: "+ data.tracks.items[0].preview_url); 
    // Album the song is from
        console.log("Album Name: "+ data.tracks.items[0].album.name); 
           });
   
            // if there is not song inputed, return info for The Sign by AoB   

// close function
};

      
   
    // create function do-what-it-says
        // should run spotify-this-son from random.txt



// switch case
switch (command) {
    case "movieThis":
        movieThis();
        break;
    
    case "concertThis":
        concertThis();
        break;

    case "spotifyThisSong":
        spotifyThisSong();
        break;

    }