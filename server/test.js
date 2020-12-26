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


router.post('/register', login.register);
router.post('login', login.login);

app.use('/api', router);
app.listen(3000);
