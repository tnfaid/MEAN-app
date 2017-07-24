var User = require('../models/user'); // memanggil user 



module.exports = function(router) {
	// http://localhost:8000/api/users
	router.post('/users', function(req, res){// si user dapat mengepost req
		var user = new User();//membuat variabel user dengan funciton User
		user.username	= req.body.username;//function+username = req untuk username
		user.password	= req.body.password;//user req password = penempatan req nanti ada di body password
		user.email		= req.body.email;//user req.email 

		if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' ){ // ini untuk kondisi jadi dimana salah yang diatas itu sudah terpenuhi maka akan muncul pesan di bawah ini
			res.json({success: false , message: 'Pastikan lagi karena username, email, dan password sudah ada'});//so ini buat munculin kayak yang di pesan console ituloh
		} else {//atau jika tidak
			user.save(function(err){//user akan menyimpan dan menampilkan
				if (err) {//jika error 
					res.json({success: false, message: 'username or email alredy exist'});
				} else { //atau
					res.json({success:true, message: 'success created !'});//muncul pesan user berhasil dibut, jika memang belum ada yang membuat
				}
			});
		}
	});
	return router;//kembali ke router
}