var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var localStrat = require('passport-local').Strategy;
var User = require('../models/User');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var api = require('./routes/api');
var index = require('./routes/index');
var register = require('./routes/register');
var users = require('./routes/users');

var mongoURI = 'mongodb://localhost:27017/todoPSQL';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error',function(err){
    console.log('Connection Error Error');
});

MongoDB.once('open',function(){
    console.log('ITS WORKING');
});


app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname + '/public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});

passport.use('local', new localStrat({ passReqToCallback : true, usernameField: 'username' },
    function(req, username, password, done){
        User.findOne({ username: username }, function(err, user) {
            if (err) throw err;
            if (!user)
                return done(null, false, {message: 'Incorrect username and password.'});

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch)
                    return done(null, user);
                else
                    done(null, false, { message: 'Incorrect username and password.' });
            });
        });
    }));


app.use('/api', api);
app.use('/', index);
app.use('/register', register);
app.use('/users', users);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
