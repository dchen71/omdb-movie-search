app.controller('MainController', ['$scope', 'movies', '$http', function($scope, movies, $http) {
	$scope.titles = {};

	movies.success(function(data){
		$scope.movies = data.Search;
		console.log(data.Search[0].imdbID);
		$scope.titles = [];
		for(var i = 0; i < data.Search.length; i++){
			get_title(data.Search[i].imdbID).then(function(response){
				console.log(response.data);
				
			});
			$scope.titles.push(get_title(data.Search[i].imdbID));
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