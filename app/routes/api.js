var User = require('../models/user'); // memanggil user 



module.exports = function(router) {
	// http://localhost:8000/users
	router.post('/users', function(req, res){// si user dapat mengepost req
		var user = new User();//membuat variabel user dengan funciton User
		user.username	= req.body.username;//function+username = req untuk username
		user.password	= req.body.password;//user req password = penempatan req nanti ada di body password
		user.email		= req.body.email;//user req.email 

		if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' ){ // ini untuk kondisi jadi dimana salah yang diatas itu sudah terpenuhi maka akan muncul pesan di bawah ini
			res.send('Pastikan lagi karena username, email, dan password sudah ada');//pesan muncul pastikan username, email dan password sudah benar
		} else {//atau jika tidak
			user.save(function(err){//user akan menyimpan dan menampilkan
				if (err) {//jika error 
					res.send('Username atau Email sudah Ada');//muncul pesan username atau email sudah ada
				} else { //atau
					res.send('user berhasil dibuat');//muncul pesan user berhasil dibut, jika memang belum ada yang membuat
				}
			});
		}
	});
	return router;//kembali ke router
}