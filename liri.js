//Import keys from the keys.js
var keys = require("./keys.js");

// Include the request npm packages
var Request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var twitterKey = keys.twitterKeys.key;
var twitterSec = keys.twitterKeys.secret;
var twitterAccKey = keys.twitterKeys.accessToken;
var twitterAccSec = keys.twitterKeys.accessSecret;

var spotifyKey = keys.spotify.key;
var spotifySec = keys.spotify.secret;

var omdbKey = keys.omdbApiKey;

var userAction = "";

if(process.argv[2]){

	userAction = process.argv[2].trim();
}

var userRequest = process.argv[3];

//following function to construct the full song title
function constructSongTitle(){
	var title="";
	for( var i=3; process.argv.length >i; i++){
		title += process.argv[i]+" ";
	}

	//console.log('song name -->'+title.trim());

	return title.trim();
}
 
function getSpotifyInfo( song) {

	var spotify = new Spotify({
	  id: spotifyKey,
	  secret: spotifySec
	});

	if(!song){
		song = "The Sign" ;// if the user does not enter song title
	}
	else{

		constructSongTitle();
		spotify.search({ type: 'track', query:song}, function(err, data) {
		  	if (err) {
		    	return console.log('Error occurred: ' + err);
		  	}
		  
		  	var songInfo = data.tracks.items[0];
		  	//console.log(songInfo);

		 	console.log("\nArtist(s) : "+songInfo.artists[0].name);
		  	console.log("\nThe song's name : "+ songInfo.name);

		    if(songInfo.preview_url === null) {
		    	console.log("\nA preview link of the song not avaiable" );
		    }
		    else {
		    	console.log("\nA preview link of the song : "+ songInfo.preview_url);
		    }

		    console.log("\nThe album name :"+songInfo.album.name);
		   

			//console.log(data.tracks.items.length);
			// for (var tracks in data) {
			//   //if (obj.hasOwnProperty(prop)) {
			//   	console.log(data[tracks].items.length);
			//     console.log("data track @@@",data[tracks].items[1]);
			//   //} 
			// }

		});
	}

} // -- End of getSpotifyInfo


function getTweets() {
	console.log("Hi Here comes Tweets");

	var Twitter = require('twitter');

	var client = new Twitter({
	  consumer_key: twitterKey,
	  consumer_secret: twitterSec,
	  access_token_key: twitterAccKey,
	  access_token_secret: twitterAccSec
	});

	var options = { screen_name: '@dayannperera',
                count: 20 };


    client.get('statuses/user_timeline', options , function(err, data) {
	    if(err){
	      	return console.log('Error occurred: ' + err);
	    }
	    else{

	    	for (var i = 0; i < data.length ; i++) {
	    	  	console.log("\n---------------------------------");
	    	  	console.log("Tweet #"+(i+1)+" "+data[i].text);
	    	  	console.log("---------------------------------");
	    	}
	    }

    });
} // ---- End getTweets() 



switch (userAction) {
	case "spotify-this-song":
		getSpotifyInfo(userRequest);
		break;
	case "my-tweets":
		getTweets();
		break;
	case "movie-this":
		getMovieInfo(userRequest);
		break;
	case "do-what-it-says":
		readFile();
		break;	
} // End of switch





