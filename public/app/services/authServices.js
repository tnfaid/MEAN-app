angular.module('authServices', [])

.factory('Auth', function($http){
	var authFactory = {};

	// User.create(loginData)
	authFactory.login = function(loginData){
		return $http.post('api/authenticate', loginData)
	};

	return authFactory;
});

