//-- get Schema from http://mongoosejs.com/docs/guide.html, penjelasanya semua di mongoose diawali dengan schema, setiap schema maps untuk koleksi mongoDB dan di definisikan bentuk dokumen dalam koleksi itu
var mongoose = require('mongoose');// manggil mongoose 'API' nya
var Schema = mongoose.Schema;// ini dari copas di mongoosejs.com dia berfungsi Semuanya di luwak dimulai dengan skema. Setiap skema peta untuk koleksi MongoDB dan mendefinisikan bentuk dokumen dalam koleksi itu
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema ({ // membuat variabel UserSchema dengna memiliki objct Schema
	username: { type: String, lowercase: true, required: true, unique: true	},// terdapat function usernama, dimana dia seperti yang dijabarkan
	password: { type: String, required: true},// ada function password juga dengan spresifikasi kayak gitu
	email: { type: String, required: true, lowercase: true, unique: true}// ada juga emal dengna spesifikasi kayak gitu
});

UserSchema.pre('save', function(next) {//ini didapat dari mongoosejs.com dia adalah serial middleware yang mengexecuted satu setelah yang lainya, ketika middleware dipnaggil 'next', jadi ketika userschema di save maka kodenya otomatis akan dibuat array acak. jadi ini nanti demi keamanan informasi yang telah dibuat oleh user
  	var user = this;//membuat variabel user dengan isinya this
  	bcrypt.hash(user.password, null, null, function(err, hash){//di acak array nya , passwordnya nanti munculnya yang enkripsi ituloh, dimana fungsinya terdapat err jika gagal dan hash jik berhasil
  		if (err) return next(err);//jika error maka diulang lagi
  		user.password = hash;//password dari user sudah di hash kan
  		next();//diulang lagi, atau kalau tidak lanjut ke baris dibwah
  	});
});


module.exports = mongoose.model('User', UserSchema);// mengexport module dengan menggunakan User, dan variabel UserSchema, jadi kayak login gitu, dan datanya ada pada variabel UserSchema itu

