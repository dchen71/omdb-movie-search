app.controller('MainController', ['$scope', 'movies', '$http', function($scope, movies, $http) {
	$scope.titles = [];

	movies.success(function(data){
		console.log($scope.movie);
		$scope.movies = data.Search;
		console.log(data.Search[0].imdbID);
		$scope.titles = [];
		for(var i = 0; i < data.Search.length; i++){
			$scope.title = get_title(data.Search[i].imdbID).then(function(response){
				console.log(response.data);
				return(response.data);
			});
			console.log($scope.title);
			$scope.titles.push($scope.title);
		}

		console.log($scope.titles);
		console.log($scope.titles[0]);
	});

	function get_title(id){
		var promise = $http.get('http://www.omdbapi.com/?i=' + id + '&r=json') 
            .success(function(data) { 
              return(data);
            });	
        return promise;
	}

 	$scope.search = function(){
 		console.log($scope.movie);
 		console.log($scope.movies);
 		return $scope.movies;
 	};
}]);