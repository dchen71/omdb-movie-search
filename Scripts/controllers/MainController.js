app.controller('MainController', ['$scope', '$http', function($scope, $http) {
	$scope.titles = [];

	//Gets the title information based in imdbID
	function get_title(id){
		var promise = $http.get('http://www.omdbapi.com/?i=' + id + '&r=json') 
            .success(function(data) { 
              return(data);
            });	
        return promise;
	}

	//Returns JSON promise which contains title and imdbID for future query
	function getMovies(title){
		return $http.get('http://www.omdbapi.com/?s=' + title + '&type=movie&r=json') 
		          .success(function(data) { 
		            return this.data; 
		          }) 
		          .error(function(err) { 
		            return err; 
		          }); 
	}

	//On click function which searches for movies based on input and creates series of promises to find title information
 	$scope.search = function(){
 		$scope.titles = [];
 		$scope.movies = getMovies($scope.movie.title);
 		//Promise to use values from prior promise to search for movie info based on imdbID
 		Promise.resolve($scope.movies).then(function(value){
 			for(var i = 0; i < value.data.Search.length; i++){
 				$scope.title = get_title(value.data.Search[i].imdbID).then(function(response){
 					//If poster is na switch to na picture
 					if(response.data.Poster == 'N/A'){
 						response.data.Poster = 'Images/NA.png';
 					}
 					return(response.data);
 				});
 				$scope.titles.push($scope.title);
 			}
 		})
 	};
}]);