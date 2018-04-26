//server init
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./server/config/db');
var auth = require('./server/config/auth');
var qest = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('./server/models/associate'); // get our mongoose model

//db init
var mongoose = require('mongoose');
 mongoose.Promise = global.Promise;    
mongoose.connect(db.url);

qest.use(bodyParser.json());
qest.use(bodyParser.urlencoded({extended: true}));


qest.use(morgan('dev'));

//auth secret
qest.set('superSecret', auth.secret); // secret variable

//routes init
var dataApi = require('./server/api/api.js')(qest, jwt);

//frontend
qest.use(express.static(__dirname + "/public/"));
qest.use(express.static(__dirname + "/node_modules/"));


//server start
var port = process.env.PORT || 5555;
qest.listen(port,"0.0.0.0");
