import project1 from './loginroutes.js';
import project2 from './loginroutes.js';

var express = require("express");
var login=require('./routes/loginroutes');
var bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.header("Access-control-allow-origin", "*");
  res.header("Access-control-allow-headers", "origin, X-requested-With, Content-type, Accept");
  next();
});

var router=express.Router();

router.post('/client/register', project1.register);
router.post('/client/login', project2.login);

app.use('/api', router);
app.listen(3000, function(){
  console.log("server on");
});
