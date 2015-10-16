var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res, next){
    var file = req.params[0] || '/views/login.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/users/home',
        failureRedirect: '/'
    })
);

module.exports = router;