var express = require('express');
var router = express.Router();
var db = require('./database')

express.post('/create', function(req, res, next){
    console.log('recieved post')
});
module.exports = router;