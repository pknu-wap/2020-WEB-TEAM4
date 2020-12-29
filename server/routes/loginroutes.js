//express 기본 모듈
var express = import from('express');
var http = import from('http');
var path = import from('path');
//express 미들웨어
var bodyParser = import from('body-parser');
var serveStatic = import from('serve-static');

var mysql = import from('mysql');

var pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'000818',
    database:'test',
    debug:false
  });

var app = express();

app.set('port', 3000);
app.use(serveStatic(path.join('public', __dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

        register(ID, Password,  Name,
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

export default function register(ID, Password,  Name, callback)
{
    console.log('register 호출');

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
            console.log('database connection threadid' + poolConn.threadId);
            var data = { id: id,  passwords: passwords, name: name };

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
}

export function confirmuser(ID, PW, callback) {
    console.log('input id :' + ID + '  :  pw : ' + PW);


    pool.getConnection(function (err, poolConn) {
        if (err) {
            if (poolConn) {
                poolConn.release();
            }
            callback(err, null);
            return;
        }

        console.log('database connection threadid' + poolConn.threadId);

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
}

var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        console.log('express server on' + app.get('port'));
    });

// //express 기본 모듈
// var express = require('express');
// var http = require('http');
// var path = require('path');
// //express 미들웨어
// var bodyParser = require('body-parser');
// var serveStatic = require('serve-static');
//
// var mysql = require('mysql');
// exports.register = function (req, res) {
//     // console.log("req", req.body);
//     var users = {
//         "id": req.body.id,
//         "password": req.body.password,
//         "name": req.body.name,
//         "email": req.body.email,
//     }
//     connenction.query('INSERT INTO users SET ?' , users, function (error, results, fields) {
//         if (error) {
//             console.log("error ocurred", error);
//             res.send({
//                 "code" : 400,
//                 "failed": "error ocurred"
//             })
//         } else {
//             console.log('The solution is: ', results);
//             res.send({
//                 "code": 200,
//                 "success": "user registered sucessfully"
//             });
//         }
//     });
// }
// exports.login = function (req, res) {
//     var email = req.body.email;
//     var password = req.body.password;
//     connection.query('SELECT * FROM users WHERE email = ?', [email],
//     function( error, results, fields) {
//         if (error) {
//             // console.log("error ocurred", error);
//             res.send({
//                 "code": 400,
//                 "failed": "error ocurred"
//             })
//         } else {
//             // console.log('The solution is: ', results);
//             if(results.length > 0) {
//                 if(results[0].password == password) {
//                     res.send({
//                         "code": 200,
//                         "success": "login sucessfull"
//                     });
//                 } else {
//                     res.send({
//                         "code": 204,
//                         "success": "Email and password does not match"
//                     });
//                 }
//             } else {
//                 res.send({
//                     "code":204,
//                     "success": "Email does not exists"
//                 });
//             }
//         }
//     })
// }
