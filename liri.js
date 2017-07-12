//Import keys from the keys.js
var keys = require("./keys.js");

// Include the request npm packages
var Request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var twitterKey = keys.twitterKeys.key;
var twitterSec = keys.twitterKeys.secret;

var spotifyKey = keys.spotify.key;
var spotifySec = keys.spotify.secret;

var omdbKey = keys.omdbApiKey;

var userRequest = process.argv[2];

var spotify = new Spotify({
  id: spotifyKey,
  secret: spotifySec
});
 
spotify.search({ type: 'track', query: 'Shape Of You' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 	//console.log(data);

	for (var tracks in data) {
	  //if (obj.hasOwnProperty(prop)) {
	  	//console.log(data);
	    console.log("data track itrm",data[tracks].items[0]);
	  //} 
	}

});