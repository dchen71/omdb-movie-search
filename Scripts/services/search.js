app.factory('movies', ['$http', function($http) { 
  var title = "batman";
  return $http.get('http://www.omdbapi.com/?s=' + title + '&type=movie&r=json') 
            .success(function(data) { 
              return this.data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
