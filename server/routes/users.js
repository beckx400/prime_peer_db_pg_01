/**
 * Created by m3rkz0r on 10/16/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    res.json(req.isAuthenticated());
});

router.get('/home', function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;