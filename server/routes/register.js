/**
 * Created by m3rkz0r on 10/16/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('../../models/User');

router.get('/', function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/', function(req,res,next) {
    Users.create(req.body, function (err, post) {
        if (err)
            next(err);
        else
            res.redirect('/users/home');
    })
});

module.exports = router;