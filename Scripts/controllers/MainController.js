app.controller('MainController', ['$scope', 'movies', '$http', '$rootScope' , function($scope, movies, $http, $rootScope) {
	$scope.titles = {};

	movies.success(function(data){
		$scope.movies = data.Search;
		console.log(data.Search[0].imdbID);
		$scope.titles = [];
		for(var i = 0; i < data.Search.length; i++){
			console.log(data.Search[i].imdbID);
			$scope.titles.push(get_title(data.Search[i].imdbID));
		}

		console.log($scope.titles);
	});

	function get_title(id){
		$http.get('http://www.omdbapi.com/?i=' + id + '&r=json') 
            .success(function(data) { 
              $scope.title = data;
              console.log($scope.title);
              return this.data;
            });	
	}

 	$scope.search = function(){
 		search.preventDefault();
 		return $scope.movies;
 	};
}]);