var User = require('../models/user'); // memanggil user 
var jwt  = require('jsonwebtoken');//ini untuk input jsonwebtokenya, dapat dari webnya github/auth0/node-jsonwebtoken
var secret = 'harrypotter';//create custom secret for use in JWT


module.exports = function(router) {
	// http://localhost:8000/api/users
	// USER REGISTRATION
	router.post('/users', function(req, res){// si user dapat mengepost req
		var user = new User();//membuat variabel user dengan funciton User
		user.username	= req.body.username;//function+username = req untuk username
		user.password	= req.body.password;//user req password = penempatan req nanti ada di body password
		user.email		= req.body.email;//user req.email 
		user.name		= req.body.name;//connect on user.js

		if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.name === null || req.body.name === ''){ // ini untuk kondisi jadi dimana salah yang diatas itu sudah terpenuhi maka akan muncul pesan di bawah ini
			res.json({success: false , message: 'Pastikan lagi karena username, email, dan password sudah ada'});//so ini buat munculin kayak yang di pesan console ituloh
		} else {//atau jika tidak
			user.save(function(err){//user akan menyimpan dan menampilkan
				if (err) {//jika error 
					if(err.errors.name){
						res.json({success: false, message: err.errors.name.message});//ini untuk memuncukan di json pesan error di kolom nama
					} else 	if ( err.errors.email ){
						res.json({success: false, message: err.errors.email.message});
					} else if (err.errors.username){
						res.json({success: false, message: err.errors.username.message});
					} if (err.errors.password){
						res.json({success: false, message: err.errors.password.message});
					}
				} else { //atau
					res.json({success:true, message: 'success created !'});//muncul pesan user berhasil dibut, jika memang belum ada yang membuat
				}
			});
		}
	});

	// USER LOGIN ROUTE
	// htpp:// localhost:port/api/authenticate
	router.post('/authenticate', function(req, res){
		User.findOne({ username: req.body.username}). select('email username password').exec(function(err, user){
			if (err) throw err;

			if (!user) {
				res.json({ success:false, message:'could not authenticate user'});
			} else if (user){

				if (req.body.password){//ini jika kolom pwd gak diisi
					var validPassword = user.comparePassword(req.body.password);//membandingkan kevalidan password
				} else {
					res.json({success:false, message:'No password provided'});//maka akan muncul no pwd provided ini
				}

				
				if (!validPassword) {
					res.json({success:false, message:'could not authenticate password'});//password dan username tak sama
				} else {
					var token = jwt.sign({ username: user.username, email: user.email}, secret, { expiresIn: '24h'} );// ini untuk token ya selumrahnya token gitu dan dia expired 24 jam
					res.json({success:true, message:'user authenticate' , token: token });//mengautentifikasikan kalau user dan password sama dengan yang telah ada
				}
			}
		});
	 
	});

	router.use(function(req, res, next){//ini bikin router untuk token 
		var token = req.body.token || req.body.query || req.headers['x-access-token'];//bikin variabel token, dengan identifikasi permintaan token, query, dan headersnya

		if (token) { //jika object token
			// verify token
			jwt.verify(token, secret, function(err, decoded) {// maka jwt akan memferifikasi var token, var secret, dan bikin function
				if (err){//jika error
					res.json({ success:false, message: 'Token Invalid'});//muncul pesan token invalid
				} else {//atau
					req.decoded = decoded;//res di decoded
					next();//oke selanjtnya jadi dia gak mentok gitu
				}
			});
		} else {//atau jika tak ada object token
			res.json({ success: false, message: 'No token provided'});// maka muncul pesan no token provided
		}
	});

	router.post('/me', function(req, res){
		res.send(req.decoded); // kembali ke token acquired dari middleware
	});

	return router;//kembali ke router
}

