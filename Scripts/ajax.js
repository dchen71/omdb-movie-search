//Global for header and footer for the content views
const head = '<div class="col-md-4 col-md-offset-4 well movie"><section>'
const foot = '</section></div>'

//Initializes variables to detect if continue to scroll and load
var results = 0;
var totalresults = 0;

//Initializes the hiding and showing of the loading picture upon ajax
$(document).ready(function () {
	var searching = false;

	//Logic which shows and hides the loading div with loading pic based on ajax calls
	$('.loading').hide();
	$(document)
	    .ajaxStart(function() {
	    	searching = true;
	        $('.loading').show();
	    })
	    .ajaxStop(function() {
	    	searching = false;
	        $('.loading').hide();
	    });

	//On scroll to the bottom will ajax the rest of the query
	$(document).scroll(function(){
		if(scrolling(".movie:last-child")){
			console.log(results);
			if(results < totalresults){
				var title = document.getElementById('movietitle').value;
				ajaxInfo(title);
			}
		}
	});
});

//Function to detect hitting the bottom of the page
function scrolling(element){
	var docTop = $(window).scrollTop();
	var docBottom = docTop + $(window).height();

	var elemTop = $(element).offset().top;
	var elemBottom = elemTop + $(element).height();

	return((elemBottom <= docBottom) && (elemTop >= docTop));
}

//Performs the ajax search that will create the entries
function ajaxSearch(id){

	$.ajax({
 
    	// The URL for the request
    	url: "http://www.omdbapi.com/?i=" + id + "&r=json",
 
    	// Whether this is a POST or GET request
    	type: "GET",
 
    	// The type of data we expect back
    	dataType : "json",
 
    	// Code to run if the request succeeds;
    	// the response is passed to the function
    	success: function(json) {
			createEntry(json); 	    	
    	},
 
    	// Code to run if the request fails; the raw request and
    	// status codes are passed to the function
    	error: function( xhr, status, errorThrown ) {
    	    alert( "Sorry, there was a problem!" );
    	    console.log( "Error: " + errorThrown );
    	    console.log( "Status: " + status );
    	    console.dir( xhr );
    	},
 
    	// Code to run regardless of success or failure
    	complete: function( xhr, status ) {
    	    console.log( "The request is complete!" );
    	}
	});
};

//Collects the title ids from the json request
function ajaxInfo(title){

	$.ajax({
 
    	// The URL for the request
    	url: "http://www.omdbapi.com/?s=" + title + "&type=movie&r=json",
 
    	// Whether this is a POST or GET request
    	type: "GET",
 
    	// The type of data we expect back
    	dataType : "json",
 
    	// Code to run if the request succeeds;
    	// the response is passed to the function
    	success: function(json) {
    	    console.log(json);
			if(json.Response == "False"){
    			var response = '<p>No movies found</p>';
    			$('.content').append(head + response + foot);
			}
			else {
				if(json.Search.length - results > 5)
					var max = 5;
				else
					var max = json.Search.length;
				

				for(var i= results; i < max; i++){
					console.log(json.Search[i]);
					ajaxSearch(json.Search[i].imdbID);
				}
				totalresults = json.Search.length;
				results = max;
			}

    	},
 
    	// Code to run if the request fails; the raw request and
    	// status codes are passed to the function
    	error: function( xhr, status, errorThrown ) {
    	    alert( "Sorry, there was a problem!" );
    	    console.log( "Error: " + errorThrown );
    	    console.log( "Status: " + status );
    	    console.dir( xhr );
    	},
 
    	// Code to run regardless of success or failure
    	complete: function( xhr, status ) {
    	    console.log( "The request is complete!" );
    	}
	});
};

//Creates the data to append to the body showing each content for movie
function createEntry(data){
	var title = data.Title;
	var year = data.Year;
	var rating = data.Rated;
	var runtime = data.Runtime;
	var genre = data.Genre;
	var plot = data.Plot;
	var language = data.Language;
	var awards = data.Awards;
	var rating = data.imdbRating;
	if (data.Poster == 'N/A')
		var poster = "Images/NA.png";
	else
		var poster = data.Poster;


	//Contains the title and generatl information
    var header = '<header class="content-header">' + 
    				'<h2>' + title + '</h2>' + 
    				'<hr>' + 
    				'<p class="col-md-4"><strong>Year:</strong> <em>' + year + '</em></p>' + 
    				'<p class="col-md-4"><strong>Runtime:</strong> <em>' + runtime + '</em></p>' + 
    				'<p class="col-md-4"><strong>Rating:</strong> <em>' + rating + '</em></p>'
    			'</header>';

    //Shows the picture and creates the main div
    var aside = '<div">' + 
    				'<aside class="pull-left text-left col-md-5 pic-info">' + 
    					'<img src="' + poster + '">' +
    					'<p class="col-md-offset-2"><strong>imdbRating:</strong>' + rating + '</p>' +
    				'</aside>';
    
    //Main body of the div in aside
    var body = '<div class="text-left">' + 
    		   		'<p><strong>Plot:</strong>' + plot + '</p>' +
       	       		'<p><strong>Genre:</strong>' + genre + '</p>' +
       	       		'<p><strong>Language:</strong>' + language + '</p>' +
       	       		'<p><strong>Awards:</strong>' + awards + '</p>' +
       	       '</div>'
       	     '</div>'
    
    $('.content').append(head + header + aside + body + foot);    	
};

//On submit of value, will perform the ajax search
$('#moviesearch').submit(function(){
	$('.content').empty();
	results = 0;
	totalresults = 0;
	var title = document.getElementById('movietitle').value;
	ajaxInfo(title);
	return false;
});