var express=require('express')
var app=express()
var bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

var mysql=require('mysql')

var connection=mysql.createConnection({
  host: "192.168.23.8",
  port:3000,
  user:"root",
  password:"1234",
  database:"test"
})

connection.connect()

app.post('/user', function(req, res){
  var userID=req.body.id
  var userPW=req.body.pw

  if(userID && userPW) {

    connection.query("INSERT INTO user(userID, userPW) VALUES (' "+userID +"', '"+userPW+"')",
        function(error, result, fields){

          if(error){
            res.send('err: ' +error)
          }
          else{
            console.log(userID + ',' + userPW)
            res.send('success create user name: '+userID+'pw: '+userPW)
          }
        })
  }
})

app.listen(3000, function(){
  console.log("server starting with 3000")
})

var connection=mysql.createConnection({
  host: "192.168.23.8",
  port:3000,
  user:"root",
  password:"1234",
  batabase:"test"
})

connection.query("INSERT INTO user (userID, userPW) VALUES ('"+userID+"', '"+userPW+"')",
    function(error,result,fields){

      if(error){
        res.send('err: '+error)
      }
      else{
        console.log(userID + ',' +userPW)
        res.send('success create user name: '+userID + 'pw: '+ userPW)
      }
    })
