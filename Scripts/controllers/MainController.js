app.controller('MainController', ['$scope', 'movies',  function($scope, movies) {
	movies.success(function(data){
		$scope.movies = data.Search;
	console.log($scope.movies);
	});
	console.log(movies);


 	$scope.search = function(){
 		search.preventDefault();
 		return $scope.movies;
 	};
}]);