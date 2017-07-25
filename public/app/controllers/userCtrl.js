angular.module('userControllers', ['userServices'])

.controller('regCtrl', function ($http, $location, $timeout, User){//$http ini untuk bisa disambungkan dengan database
	
	var app= this;

	this.regUser = function(regData){//fungsi dari regData dia adalah object yang tersambung dengan yang ada di register.html pada form form nya
		app.loading = true;
		app.errorMsg = false;//ini untuk menampilkan kalao errorMsg diawal itu adalah gak muncul


		$http.post('api/users', this.regData).then(function(data){//ini untuk mengkoneksikan dengan yang ada di api.js jadi data yang sudah ada bisa terlihat dan akan muncul pesan sudah dibuat kalau memang sudah, sebenarnya bisa terkoneksi karena adanya /users itu tuh 
			if (data.data.success) {
				app.loading = false;
				// create success message
				app.successMsg = data.data.message + '....Redirecting';
				// redirect to home page

				$timeout(function() {
					$location.path('/'); //ini untuk kembali ke home langsung setelah finish registration
				}, 2000);

			} else {
				app.loading = false;
				// create an error message
				app.errorMsg = data.data.message;
			}
		});//ini untuk mengepostkan afar bisa terlihat di database
	};
});


.controller('facebookCtrl', function(){
	// Auth.facebook(token);
	console.log('testing facebook Ctrl');
});
