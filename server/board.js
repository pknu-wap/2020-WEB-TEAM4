var express=require('express');
var router=express.Router();
var bd_board=require('/client/write');

var mysql=require('mysql');

var pool=mysql.createPool({
  connectionLimit: 150,
  host: '127.0.0.1',
  user: 'root',
  password: '000818',
  database: 'test'
});

router.get('/', function(req, res) {
  res.render('index', {title: 'Express'});
});

///write요청 들어오면 연결
router.get('/write', function(req,res){
  res.render('write_r', {title: '글쓰기'});
});
