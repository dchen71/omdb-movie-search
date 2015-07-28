app.factory('movies', ['$http', function($http) { 
  return $http.get('http://www.omdbapi.com/?s=batman&type=movie&r=json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);