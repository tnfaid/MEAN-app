var FacebookStrategy = require('passport-facebook').Strategy;
var User			 = require('../models/user');
var session 		 = require('express-session');//get from github/expressjs/session and this is the API

// and this is get from passport.js
var jwt  = require('jsonwebtoken');//ini untuk input jsonwebtokenya, dapat dari webnya github/auth0/node-jsonwebtoken
var secret = 'harrypotter';//create custom secret for use in JW

module.exports = function(app, passport){

	// get from initialize on passportjs-facebook
    app.use(passport.initialize());
    app.use(passport.session());
	app.use(session({  secret: 'keyboard cat',  resave: false,  saveUninitialized: true,  cookie: { secure: false } }));//get from app.user on github.expressjs.session

	    // get from serial on passportjs-facebook
		passport.serializeUser(function(user, done) {
    	  token = jwt.sign({ username: user.username, email: user.email}, secret, { expiresIn: '24h'} );
		  done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
        	User.findById(id, function(err, user) {
            	done(err, user); // Complete deserializeUser and return done
        	});
    	});
	
		passport.use(new FacebookStrategy({
		    clientID: '1814914452172038',
		    clientSecret: 'd657c96c5bcfc16ab0935004f985d121',
		    callbackURL: "http://localhost:8000/auth/facebook/callback",
		  	profileFields: ['id', 'displayName', 'photos', 'email']
		  },

		  function(accessToken, refreshToken, profile, done) {
		    User.findOne({email: profile._json.email}).select('username password email').exec(function(err, user){
		    	if (err) done(err);

		    	if (user && user != null) {
		    		done(null, user);
		    	} else {
		    		done (err);
		    	}
		    });
		    done(null, profile);
		  }
		));


		app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res){
			res.redirect('/facebook/' + token);	
		});

		app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

		return passport;
}