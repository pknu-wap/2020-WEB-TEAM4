import express from "express";
import login from "./routes/loginroutes.js";
import bodyParser from "body-parser";

import http from 'http';
import path from 'path';
import serveStatic from 'serve-static';

console.log(login);

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-control-allow-origin", "*");
  res.header("Access-control-allow-headers", "origin, X-requested-With, Content-type, Accept");
  next();
});


var appServer = http.createServer(app);
appServer.listen(app.get('port'),
  function () {
    console.log('express server on' + app.get('port'));
  });

  console.log(login);

var router = express.Router();

console.log("login", login);
router.post('/client/register', login);

app.use('/', router);
app.listen(3000, function () {
  console.log("server on");
});
