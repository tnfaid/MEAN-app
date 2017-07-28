angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window){
	var app= this;

	app.loadme = false;

	$rootScope.$on('$routeChangeStart', function() {//ini fungsi untuk ketika logout langsung logout gitu
		if (Auth.isLoggedIn()) {
			app.isLoggedIn = true;
			Auth.getUser().then(function(data) {
				app.username  = data.data.username;
				app.useremail = data.data.email;
				app.loadme	  = true;
			});
		} else {
			app.isLoggedIn = false;//ini untuk nampilin menu bar ituloh, jadi nanti bisa muncul atau nggak nya tergantuk dikasih ! atau tidak
			app.username = '';//dan ini yang langsung ganti usrnamenya langsung hilang ketika logout
			app.loadme = true;
		}
		if ($location.hash() == '_=_') $location.hash(null);
	});

	this.facebook = function(){
		// console.log($window.location.host);//locahost:8000
		// console.log($window.location.protocol);//http:
		$window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
	}

	
	this.doLogin = function(loginData){//fungsi dari regData dia adalah object yang tersambung dengan yang ada di register.html pada form form nya
		app.loading = true;
		app.errorMsg = false;//ini untuk menampilkan kalao errorMsg diawal itu adalah gak muncul


		Auth.login(app.loginData).then(function(data){//ini untuk mengkoneksikan dengan yang ada di api.js jadi data yang sudah ada bisa terlihat dan akan muncul pesan sudah dibuat kalau memang sudah, sebenarnya bisa terkoneksi karena adanya /users itu tuh 
			if (data.data.success) {
				app.loading = false;
				// create success message
				app.successMsg = data.data.message + '....Redirecting';
				// redirect to home page

				$timeout(function() {
					$location.path('/about'); //ini untuk kembali ke home langsung setelah finish registration
					app.loginData = '';
					app.successMsg = false;
				}, 2000);

			} else {
				app.loading = false;
				// create an error message
				app.errorMsg = data.data.message;
			}
		});//ini untuk mengepostkan afar bisa terlihat di database
	};

	this.logout = function (){
		Auth.logout();//ini untuk funciton logout nya
		$location.path('/logout');//lokasi logout nya lokasi path lah
		$timeout(function(){//ini untuk time nya jadi ketika sudah temout
			$location.path('/');//maka dia akan kembali ke home, dengan status logout
		}, 2000);//ini time max nya
	};
});








