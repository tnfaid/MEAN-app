var app = angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider, $locationProvider){
	
	$routeProvider

	.when('/', {
		templateUrl : 'app/views/pages/home.html'
	})

	.when('/about',{
		templateUrl : 'app/views/pages/about.html'
	})

	.when('/register',{
		templateUrl : 'app/views/pages/users/register.html',
		controller  : 'regCtrl',
		controllerAs: 'register',
		authenticated : false
	})

	.when('/login',{
		templateUrl : 'app/views/pages/users/login.html',
		authenticated : false
	})

	.when('/logout', {
		templateUrl : 'app/views/pages/users/logout.html',
		authenticated : true
	})

	.when('/profile', {
		templateUrl : 'app/views/pages/users/profile.html',
		authenticated : true
	})

	.when('/facebook/:token' , {
		templateUrl : 'app/views/pages/users/social/social.html',
		controller  : 'facebookCtrl',
		controllerAs: 'facebook',
		authenticated : false
	})

	.when('/facebookerror', {
		templateUrl : 'app/views/pages/users/login.html',
		controller  : 'facebookCtrl',
		controllerAs: 'facebookCtrl',
		authenticated : false
	})

	.otherwise({ redirectTo : '/'});
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});

app.run(['$rootScope','Auth',function($rootScope, Auth, $location){

	$rootScope.$on('$routeChangeStart', function(event, next, current){

		if (next.$$route.authenticated == true) {
			if (!Auth.isLoggedIn()) {
				event.preventDefault();
				$locaiton.path('/');
			}

		} else if (next.$$route.authenticated == false) {
			if (Auth.isLoggedIn()) {
				event.preventDefault();
				$location.path('/profile');
			}
			console.log('should not to be authenticated')
		} else {
			// console.log('authenticated does not matter')
		}
		// console.log(next.$$route.authenticated);//to show the status, test ok
		
	});

}]);
	