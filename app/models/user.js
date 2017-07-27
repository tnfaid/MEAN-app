//-- get Schema from http://mongoosejs.com/docs/guide.html, penjelasanya semua di mongoose diawali dengan schema, setiap schema maps untuk koleksi mongoDB dan di definisikan bentuk dokumen dalam koleksi itu
var mongoose = require('mongoose');// manggil mongoose 'API' nya
var Schema   = mongoose.Schema;// ini dari copas di mongoosejs.com dia berfungsi Semuanya di luwak dimulai dengan skema. Setiap skema peta untuk koleksi MongoDB dan mendefinisikan bentuk dokumen dalam koleksi itu
var bcrypt   = require('bcrypt-nodejs');
var titlize  = require('mongoose-title-case');//inisialisasi titlize
var validate = require('mongoose-validator');//get from mongoose-validator on github.com

// get from mongoose-validator on github, fungsinya untuk mencocokan nama yang dibut di register dengan ketentuan sebagai berikut
var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/, //ini untuk bikin karakter dari akecilsampai besar dengan anyak huru 3-20 dan ada spasi terus bisa diisi huruf lagi, intinya ketentuan penulisan kalian dapat memparaktekan di regexr.com
    message  : 'Name Must be at least 3 characters, max 30, no special character or number, must have space between name.'//kalau tak sama dengan ketentuan akan muncul pesan ini
  })
];

// validate for email 
var emailValidator = [
  validate({
    validator: 'isEmail',
    message  : 'is not a valid email.'//kalau tak sama dengan ketentuan akan muncul pesan ini
  }),

  // get from mongoose-validator isEmail
  validate({
    validator: 'isLength',//validatornya itu namanya is lenght
    arguments: [3, 25],//dengan panjang karakter min 3 max 25
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'//terus emailnya harus ada arg character 1 atau tidak sma sekali
  })
];

// username validator
var usernameValidator = [
  validate({
    validator: 'isLength',//validatornya itu namanya is lenght
    arguments: [3, 25],//dengan panjang karakter min 3 max 25
    message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'//terus emailnya harus ada arg character 1 atau tidak sma sekali
  }),

  validate({
    validator:'isAlphanumeric',//get from github.com/mongoose-validator
    message : 'username must contain letters and number only'
  })
];

// password validator
var passwordValidator = [
  validate({
    validator: 'matches',
    arguments: /^(?=.*?[a-z])(?=.*[A-Z])(?=.*?[\d])(?=.*[\W]).{8,35}$/, //ini untuk bikin karakter dari akecilsampai besar dengan anyak huru 3-20 dan ada spasi terus bisa diisi huruf lagi, intinya ketentuan penulisan kalian dapat memparaktekan di regexr.com
    message  : 'Password must be at least one lowercase, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'//kalau tak sama dengan ketentuan akan muncul pesan ini
  })
];

var UserSchema = new Schema ({ // membuat variabel UserSchema dengna memiliki objct Schema
	name : { type: String, required: true, validate: nameValidator },
  username: { type: String, lowercase: true, required: true, unique: true, validate: usernameValidator	},// terdapat function usernama, dimana dia seperti yang dijabarkan, fungsi lowercase: true, berarti namanya ntar kesimpan dengan huruf besar semua
	password: { type: String, required: true, validate: passwordValidator},// ada function password juga dengan spresifikasi kayak gitu
	email: { type: String, required: true, lowercase: true, unique: true, validate: emailValidator}// ada juga emal dengna spesifikasi kayak gitu
});

UserSchema.pre('save', function(next) {//ini didapat dari mongoosejs.com dia adalah serial middleware yang mengexecuted satu setelah yang lainya, ketika middleware dipnaggil 'next', jadi ketika userschema di save maka kodenya otomatis akan dibuat array acak. jadi ini nanti demi keamanan informasi yang telah dibuat oleh user
  	var user = this;//membuat variabel user dengan isinya this, lebih tepatnya inisialisasi sih :v
  	bcrypt.hash(user.password, null, null, function(err, hash){//di acak array nya , passwordnya nanti munculnya yang enkripsi ituloh, dimana fungsinya terdapat err jika gagal dan hash jik berhasil
  		if (err) return next(err);//jika error maka diulang lagi
  		user.password = hash;//password dari user sudah di hash kan
  		next();//diulang lagi, atau kalau tidak lanjut ke baris dibwah
  	});
});

// this get from npmjs website
UserSchema.plugin(titlize, {
  paths: [ 'name' ],//array of paths, this is to array the name
});

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);// mengexport module dengan menggunakan User, dan variabel UserSchema, jadi kayak login gitu, dan datanya ada pada variabel UserSchema itu

