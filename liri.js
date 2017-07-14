//Import keys from the keys.js
var keys = require("./keys.js");

var userAction = "";

if(process.argv[2]){

	userAction = process.argv[2].trim();
}

var userRequest = process.argv[3];

//following function to construct the full song title or movie
function constructTitle(){
	var title="";
	for( var i=3; process.argv.length >i; i++){
		title += process.argv[i]+" ";
	}

	return title.trim();
}
 

function getSongDetails(track) {
	var songTitle = track;

	if(!track){
		songTitle = "The Sign";// if the user does not enter song title
	}
	else{

		songTitle = constructTitle();
	}
		
	console.log( "%% Song Title %%--:"+songTitle);
	getSpotifyInfo(songTitle);
	
} // -- End of getSpotifyInfo


function getSpotifyInfo(song){

	var Spotify = require('node-spotify-api');

	var spotify = new Spotify({
	  id: keys.spotify.key,
	  secret: keys.spotify.secret
	});

	spotify.search({ type: 'track', query:song}, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
	  
	  	var songInfo = "";

	  	for( var i=0; data.tracks.items.length >i; i++){
	  		
	  		songInfo = data.tracks.items[i];
	  		console.log("\n------------------------------------------------------------------------------");
				console.log("\nArtist(s) : "+songInfo.artists[0].name);
			 	console.log("\nThe song's name : "+ songInfo.name);

			   	if(songInfo.preview_url === null) {
			   		console.log("\nA preview link of the song not avaiable" );
			   	}
			   	else {
			   		console.log("\nA preview link of the song : "+ songInfo.preview_url);
			   	}

			   	console.log("\nThe album name :"+songInfo.album.name);

			   	console.log("\n------------------------------------------------------------------------------");

	  	}

	});
}

function getTweets() {

	var Twitter = require('twitter');

	console.log("Hi Here comes Tweets");

	var client = new Twitter({
	  consumer_key: keys.twitterKeys.key,
	  consumer_secret: keys.twitterKeys.secret,
	  access_token_key: keys.twitterKeys.accessToken,
	  access_token_secret: keys.twitterKeys.accessSecret
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


function getMovieInfo(movieTitle){

	// Include the request npm packages
	var Request = require("request");

	var title = movieTitle;

	if(!title){
		title = "Mr. Nobody";
	}
	else {

		title = constructTitle();
	}

	//console.log( "%% Movie Title %%--:"+title);

	// Then run a request to the OMDB API with the movie specified
	Request("http://www.omdbapi.com/?t="+title+"&y=&plot=short&apikey="+keys.omdbApiKey, function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	  	var movieDetails = JSON.parse(body);
			console.log("\n* Title of the movie :"+movieDetails.Title);
			console.log("\n* Year the movie came out :"+movieDetails.Year);
			console.log("\n* IMDB Rating of the movie. :"+movieDetails.imdbRating);
			console.log("\n* Rotten Tomatoes Rating of the movie. :"+movieDetails.Ratings[1]['Value']);
			console.log("\n* Country where the movie was produced. :"+movieDetails.Country);
			console.log("\n* Language of the movie. :"+movieDetails.Language);
			console.log("\n* Plot of the movie. :"+movieDetails.Plot);
			console.log("\n* Actors in the movie. :"+movieDetails.Actors);

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	  }
	});

}

function readFile(){

	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

	  // We will then print the contents of data
	  console.log(data);
	  


	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  // We will then re-display the content as an array for later use.
	  console.log(dataArr[0]);

	  var songTitle = dataArr[1];
	  

	  songTitle = songTitle.slice(0, -1); // Remove last " from the song title
	  songTitle = songTitle.slice(1, songTitle.length); // Remove first " from the song title

	  console.log("after --"+songTitle);

	  getSpotifyInfo(songTitle);

	});
}

switch (userAction) {
	case "spotify-this-song":
		getSongDetails(userRequest);
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





