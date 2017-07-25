angular.module('authServices', [])

.factory('Auth', function($http, AuthToken){
	var authFactory = {};

	// Auth.create(regData)
	authFactory.login = function(loginData){// yang ini ngambil dari object data, 
		return $http.post('api/authenticate', loginData).then(function(data){ // data yang ada akan di authentication, 
			AuthToken.setToken(data.data.token);//ini ngeset data token
			return data;
		});			
	};

	// Auth.isLoggedIn();
	authFactory.isLoggedIn = function(	){
		if(AuthToken.getToken()) {
			return true;
		} else {
			return false;
		}
	};

	// Auth.facebook(token);
	authFactory.facebook = function(token){
		AuthToken.setToken(token);
	};

	//Auth.getUser();
	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.post('/api/me');
		} else {
			$q.reject({message : ' User has no token'});
		}
	};

	// Auth.logout();
	authFactory.logout = function(){
		AuthToken.setToken();//ini ngeset data token jadi kosong lagi, kan dia logout
	};

	return authFactory;
})

.factory('AuthToken', function($window){//yang ini dia ambil object Auth token, jadi token token yang tadi ituloh
	var authTokenFactory = {};// bikin variabel authtokenfactory 

	// AuthToken.setToken(token);
	authTokenFactory.setToken = function(token){//ini nge set token dan bikin function dengan object token
		if (token) {
			$window.localStorage.setItem('token', token);//ini ngesimpen token dalam localstorage dengan make object token	
		} else {
			$window.localStorage.removeItem('token');// jadi yang ini untuk nge remove token kalau kalian logout
		}		
	};

	// AuthToken.getToken(token);
	authTokenFactory.getToken = function(){//ini untuk ngedapetin tokenya yang udah diset di atas noh
		return $window.localStorage.getItem('token');//ini ngedapetin token
	};

	return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken){
	var authInterceptorsFactory = {};

	authInterceptorsFactory.request = function(config){

		var token = AuthToken.getToken();

		if (token) config.headers['x-access-token'] = token;

		return config;
	};

	return authInterceptorsFactory;

});

