var express = require('express'); //fungsinya agar bisa mengexport  'express module'
var app = express();// untuk exports 'express' module
var port = process.env.PORT || 8000; // membuat variabel pemanggilan port
var morgan = require('morgan');// fungsinya mengexport morgan dari 'API'
var mongoose = require('mongoose');//manggil mongoose api nya
var User = require('./app/models/user'); // memanggil user 
var bodyParser = require('body-parser');//--this from expresjs.com
var router 	= express.Router();
var appRoutes	= require('./app/routes/api')(router);
var path	= require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));//'dev' digunakan dalam morgan untuk memberikan status seperti kode warna merah untuk kesalahan server, kuning untuk kesalahan klien, cyan untuk pengalihan kode, dan uncolored untuk smua kode lainya.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded//--end of get expressjs.com
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

//http://localhost:8000/api/users

mongoose.connect('mongodb://localhost:27017/tutorial', function(err){//menyambungkan ke mongodatabase dimana port 27017 didapat dari connecting port yang ada di cmd mongo, untuk kata tutorial saya masih bingung, mungkin itu hanya url, dan untuk function err itu dia berfungsi untuk yang di bawah
	if (err) { //jika error
		console.log('Gak nyambung nang database bro: ' + err ); // maka akan muncul tulisan 'gak nyambung nang database bro' plus ada tulisan error nya dimana
	} else { //atau
		console.log('Sukses Tersambung nang MongoDB');//jika berhasil tampil pesan 'sukses tersambung nang mongoDB'
	}
});

app.get('*', function(req, res){//jadi ini untuk tampilan pertama yang di dapat, 
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));//ini mengirimkan file index.html yang didapat dari nama direktori dan lokasi direktori tersebut dimana saja
});

app.listen(port, function(){ //membuat link dengan port 8080, jadi ketika pemanggilan nanti  'localhost:8080' dimana port nya sudah masuk dalam variabel port diatas
	console.log('Menjalankan server pada port' + port);//untuk menampilkan pesan  ketika perintah npm start server.js di jalankan di cmd
});

// // http://localhost:8000/users
// app.post('/users', function(req, res){// si user dapat mengepost req
// 	var user = new User();//membuat variabel user dengan funciton User
// 	user.username	= req.body.username;//function+username = req untuk username
// 	user.password	= req.body.password;//user req password = penempatan req nanti ada di body password
// 	user.email		= req.body.email;//user req.email 

// 	if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' ){ // ini untuk kondisi jadi dimana salah yang diatas itu sudah terpenuhi maka akan muncul pesan di bawah ini
// 		res.send('Pastikan lagi karena username, email, dan password sudah ada');//pesan muncul pastikan username, email dan password sudah benar
// 	} else {//atau jika tidak
// 		user.save(function(err){//user akan menyimpan dan menampilkan
// 			if (err) {//jika error 
// 				res.send('Username atau Email sudah Ada');//muncul pesan username atau email sudah ada
// 			} else { //atau
// 				res.send('user berhasil dibuat');//muncul pesan user berhasil dibut, jika memang belum ada yang membuat
// 			}
// 		});
// 	}
// });
