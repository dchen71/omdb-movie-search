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
 		$scope.titles = [];
 		$scope.movies = getMovies($scope.movie.title);
 		Promise.resolve($scope.movies).then(function(value){
 			for(var i = 0; i < value.data.Search.length; i++){
 				$scope.title = get_title(value.data.Search[i].imdbID).then(function(response){
 					return(response.data);
 				});
 				$scope.titles.push($scope.title);
 			}
 		})
 	};
}]);