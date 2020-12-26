const toggleBtn = document.querySelector('.mainbar_toggleBtn');
const menu = document.querySelector('.main_menu');
const login = document.querySelector('.main_login');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    login.classList.toggle('active');
});
var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();
 
 
router.get('/recommend/:page', function(req, res, next) {
    var page = req.params.page;
    var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('recommend', {title: '게시판 리스트', rows: rows});
    });
});
module.exports = router;

router.get('/write', function(req,res,next){
    res.render('write',{title : "게시판 글 쓰기"});
});

router.post('/write', function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];
 
 
    var sql = "insert into test(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/test/list');
    });
});
