//express 기본 모듈
var express = require('express');
var http = require('http');
var path = require('path');
//express 미들웨어
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');

var mysql = require('mysql');

var connection=mysql.createConnection({
  host:"localhost",
  port:3000,
  user:"root",
  password:"1234",
  database: "test"
  });

  var pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'000818',
    database:'test',
    debug:false
  });

  connection.connect((err)=> {
    if(err){
      console.log('error');
      return;
    }
    console.log('connected');
  })

var app = express();

app.set('port', 3000);
app.use(serveStatic(path.join('public', __dirname, 'public')));

var bodyParser_post = require('body-parser');
app.use(bodyParser_post.urlencoded({ extended: false }));
app.use(bodyParser_post.json());
app.use(serveStatic(path.join(__dirname, 'public')));

var router = express.Router();
router.route('/client/register').post(
    function (req, res)
    {
        console.log('success');
        var ID = req.body.id || req.query.id;
        var Password = req.body.passwords || req.query.passwords;
        var Name = req.body.name || req.query.name;
        console.log('id:' + ID + ', PW: ' + PW + ' , Name: ' + Name);

        addUser(ID, Password,  Name,
            function (err, result) {
                if (err) {
                    console.log('Error');
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.end();
                    return;
                }
                if (result)
                {
                    console.dir(result);
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write('<h1>Add Success</h1>');
                    res.end();
                }
            }
        );
    }
);

router.route('/client/login').post(
    function (req, res) {
        console.log('success');
        var ID = req.body.id || req.query.id;
        var PW = req.body.passwords || req.query.passwords;
        console.log('ID : ' + ID + ', PW : ' + PW);

        confirmuser(ID, PW,
            function (err, rows)
            {
                if (err) {
                    console.log('Error!');
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.end();
                    return;
                }

                if (rows) {
                    console.dir(rows);
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write('<h1>Login Success</h1>');
                    res.write('<h1> user </h1>' + rows[0].name);
                    res.end();
                }
            }
        );
    }
);

app.use('/', router);

var addUser = function(ID, Password,  Name)
{
    console.log('addUser 호출');

    pool.getConnection(
        function (err, poolConn)
        {
            if (err)
            {
                if (poolConn) {
                    poolConn.release();
                }
                callback(err, null);
                return;
            }
            console.log('데이터베이스 연결 스레드 아이디' + poolConn.threadId);
            var data = { id: id, name: name, age: age, passwords: passwords };

            //users 테이블에 데이터 추가
            var exec = poolConn.query('insert into users set ?', data,
                function (err, result)
                {
                    poolConn.release();
                    console.log('실행된 SQL : ' + exec.sql);

                    if (err) {
                        console.log('sql 실행 시 에러 발생');
                        callback(err, null);
                        return;
                    }
                    callback(null, result);
                }
            );
        }
    );
}

var confirmuser = function (ID, PW) {
    console.log('input id :' + ID + '  :  pw : ' + PW);


    pool.getConnection(function (err, poolConn) {
        if (err) {
            if (poolConn) {
                poolConn.release();
            }
            callback(err, null);
            return;
        }

        console.log('데이터베이스 연결 스레드 아이디' + poolConn.threadId);

        var tablename = 'users';
        var columns = ['id', 'pw'];

         var exec = poolConn.query("select ?? from ?? where id = ? and passwords=?", [columns, tablename, id, password],

            function (err, rows)
            {
                poolConn.release();
                console.log('실행된 ssql : ' + exec.sql);

                if (err) {
                    callback(err, null);
                    return;
                }
                if (rows.length > 0) {
                    console.log('user found');
                    callback(null, rows);
                } else {
                    console.log('user not found');
                    callback(null, null);
                }
            }
      );
    }
    );
};

var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        console.log('express 웹서버 실행' + app.get('port'));
    }
);
