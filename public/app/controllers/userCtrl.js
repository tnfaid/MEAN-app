angular.module('userControllers', ['userServices'])

.controller('regCtrl', function ($http, $location, $timeout, User){//$http ini untuk bisa disambungkan dengan database
	
	var app= this;

	this.regUser = function(regData, valid){//fungsi dari regData dia adalah object yang tersambung dengan yang ada di register.html pada form form nya
		app.loading = true;
		app.errorMsg = false;//ini untuk menampilkan kalao errorMsg diawal itu adalah gak muncul

		if (valid) {
			User.create(app.regData).then(function(data){
				if (data.data.success) {
					app.loading = false;
					// create success message
					app.successMsg = data.data.message + '....Redirecting';
					// redirect to home page

					$timeout(function() {
						$location.path('/register'); //ini untuk kembali ke home langsung setelah finish registration
					}, 2000);
				} else {
					app.loading = false;
					// create an error message
					app.errorMsg = data.data.message;
				}
			});	
		 } else {
			app.loading = false;
			// create an error message
			app.errorMsg = 'please ensure form is filled our properly';
			console.log(err);
		}	
	};//ini untuk mengepostkan afar bisa terlihat di database
})


.controller('facebookCtrl', function($routeParams, Auth, $location, $window){//ini untuk login using facebook
	var app = this;

	if ($window.location.pathname == '/facebookerror'){
		app.errorMsg = 'facebook e-mail not found in database.';
	} else {
		Auth.facebook($routeParams.token);//jadi dia ambil token, 
		$location.path('/');//langsung kalo udah masuk dia ke home
	}
});
