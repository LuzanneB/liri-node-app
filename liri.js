require("dotenv").config();
const chalk = require('chalk');
const fs = require ("fs");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let userInput = null
 
// decide how to join the user input based on command
if (command === "movieThis"){
    userInput = process.argv.slice(3).join("+");
}
    else if(command === "spotifyThisSong"){
     userInput = process.argv.slice(3).join(" ");   
    }
    else {
    userInput = process.argv.slice(3).join("%20");
    }

 // create function movie-this to take in input
function movieThis(){
       
    // if there is no movie inputed, search for Mr.Nobody
    if (process.argv[3] === undefined){
       userInput = "Mr.Nobody";
    }
 
    // queryURL
    let queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  
 // if movie title was inputed, search OMDB API and return:
    axios.get(queryUrl).then(
        function(response) {
            console.log(chalk.bgWhite("**********************************************************"));
        // * Title of the movie. - Title
            console.log(chalk.green("Title: " + response.data.Title));
         // * Year the movie came out. - Year
            console.log(chalk.green("Release Year: "+ response.data.Year));            
        // * IMDB Rating of the movie. - imdbRating
            console.log(chalk.red("IMDB Rating: "+ response.data.imdbRating));    
        // * Rotten Tomatoes Rating of the movie.-response.data.Ratings[1].Value
            console.log(chalk.red("Rotten Tomatoes Rating: "+ response.data.Ratings[1].Value));    
        // * Country where the movie was produced. -Country
            console.log(chalk.blue("Country: "+ response.data.Country));    
        // * Language of the movie. - Language
            console.log(chalk.blue("Language: "+ response.data.Language));
         // * Actors in the movie. - Actors
            console.log(chalk.yellow("Actors: "+ response.data.Actor));          
        // * Plot of the movie. - Plot
            console.log(chalk.yellow("Plot: "+ response.data.Plot));
            console.log(chalk.bgWhite("**********************************************************"));  
        });  

// close function
};
            
           
         
// create functions for Liri to respond to
    // create function concert-this:
function concertThis(){

      // this will search BIT API for an artist and  return the following about each event:
    queryUrl=("https://rest.bandsintown.com/artists/"+userInput+"/events?app_id=codingbootcamp")
    
  
    axios.get(queryUrl).then(
        function(response) {
            console.log(chalk.bgYellow.yellow("**********************************************************"));
        // Name of Venue
            console.log(chalk.magenta("Venue: " + response.data[0].venue.name));
        // venue location
            console.log(chalk.cyan("City, Country: " + response.data[0].venue.city +", "+ response.data[0].venue.country));
        // date of event (use moment for mm/dd/yyyy format)
            console.log(chalk.cyan("Event Date: "+ moment(response.data[0].datetime).format("MM/DD/YYYY")));
            console.log(chalk.bgYellow.yellow("**********************************************************"));
        })
    .catch(function(err) {
        console.log(err);
          });
    
// close function
};
      
    // create function spotify-this-song
function spotifyThisSong(){
    
    // if there is not song inputed, return info for The Sign by AoB   
    if (process.argv[3] === undefined && userInput===""){
        userInput = "the sign ace of base";
     }
   

    spotify.search({ type: 'track', query: userInput, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        };
        console.log(chalk.bgMagenta.magenta("**********************************************************"));
    // Artist Name
        console.log(chalk.cyan("Artist Name: "+ data.tracks.items[0].artists[0].name)); 
    // Song Name
        console.log(chalk.blue("Song Name: "+ data.tracks.items[0].name)); 
    // A preview link of the song from spotify
        console.log(chalk.blue("Preview Link: "+ data.tracks.items[0].preview_url)); 
    // Album the song is from
        console.log(chalk.blue("Album Name: "+ data.tracks.items[0].album.name)); 
        console.log(chalk.bgMagenta.magenta("**********************************************************"));
           })

    
// close function
};

 
    // create function do-what-it-says
function doWhatItSays(){
    fs.readFile("random.txt","utf-8", function(error,data){
        if (error){
            console.log(error);
        }
    let arr= data.split(",")
    command=arr[0];
    userInput=arr[1];
     
    switch (command) {
        case "movieThis":
            movieThis(userInput);
            break;
        
        case "concertThis":
            concertThis(userInput);
            break;
    
        case "spotifyThisSong":
            spotifyThisSong(userInput);
            break;
        case "doWhatItSays":
            doWhatItSays(userInput);
            break;
        }    
    })
}
        // should run spotify-this-song from random.txt



// switch case to take in command and run corresponding function
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
    case "doWhatItSays":
        doWhatItSays();
        break;
    }