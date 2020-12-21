var express=require('express')
var app=express()
var bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

var mysql=require('mysql')

exports.register=function(req,res){
  var today=new Date();
  var users={
    "id": req.body.id,
    "password": req.body.password,
    "reconfirm": req.body.password,
    "name":req.body.name,
  }
  connection.query('Insert into users set', users,function(error, results, fields){
    if(error){
      console.log("error", error);
      res.send({
        "code":400,
        "failed":"error"
      })
        }
        else{
          console.log('The solution is:', results);
          res.send({
            "code":200,
            "success":"user registered successfully"
          });
        }
  });
}



var connection=mysql.createConnection({
  host:"192.168.23.8",
  port:3000,
  user:"root",
  password:"1234",
  database:"test"
})

exports.login=function(req, res){
  var id=req.body.id;
  var password=req.body.password;
  connection.query('SELECT * FROM test WHERE id = ?', [id],
  function(error, results, fields{
    if(error){
      res.send({
        "code":400,
        "failed": "error"
      })
    }
    else{
      if(results.length>0){
        if(results[0].password==password){
          res.send({
            "code": 200,
            "success": "login successful"
          });
        }
        else{
          res.send({
            "code":204,
            "success": "do not match"
          });
        }
        else{
          res.send({
            "code":204,
            "success": "id does not exists"
          });
        }
      }
    }
  })
}
