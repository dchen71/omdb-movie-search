app.controller('MainController', ['$scope', 'movies', '$http', function($scope, movies, $http) {
	$scope.titles = [];

	function get_title(id){
		var promise = $http.get('http://www.omdbapi.com/?i=' + id + '&r=json') 
            .success(function(data) { 
              return(data);
            });	
        return promise;
	}

	function getMovies(title){
		return $http.get('http://www.omdbapi.com/?s=' + title + '&type=movie&r=json') 
		          .success(function(data) { 
		            return this.data; 
		          }) 
		          .error(function(err) { 
		            return err; 
		          }); 
	}

 	$scope.search = function(){
 		console.log($scope.movie);
 		console.log(getMovies($scope.movie.title));
 		$scope.movies = getMovies($scope.movie.title);
 		console.log($scope.movies);
 		Promise.resolve($scope.movies).then(function(value){
 			console.log(value.data.Search);
 			for(var i = 0; i < value.data.Search.length; i++){
 				$scope.title = get_title(value.data.Search[i].imdbID).then(function(response){
 					console.log(response.data);
 					return(response.data);
 				});
 				console.log($scope.title);
 				$scope.titles.push($scope.title);
 			}
 			
 			console.log($scope.titles);
 			console.log($scope.titles[0]);
 		})
 	};
}]);