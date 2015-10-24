app.controller('MainController', ['$scope', 'movies', '$http', function($scope, movies, $http) {
	$scope.titles = {};

	movies.success(function(data){
		$scope.movies = data.Search;
		console.log(data.Search[0].imdbID);
		$scope.titles = [];
		for(var i = 0; i < data.Search.length; i++){
			$scope.title = get_title(data.Search[i].imdbID).then(function(response){
				return(response.data);
			});
			console.log($scope.title)
			$scope.titles.push($scope.title);
		}

		console.log($scope.titles);
	});

	function get_title(id){
		var promise = $http.get('http://www.omdbapi.com/?i=' + id + '&r=json') 
            .success(function(data) { 
              return(data);
            });	
        return promise;
	}

 	$scope.search = function(){
 		search.preventDefault();
 		return $scope.movies;
 	};
}]);