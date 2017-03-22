var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/static')));

app.use("/about",function(req,res){
  console.log("关于");
  res.send("hello world");
});

module.exports = app;
