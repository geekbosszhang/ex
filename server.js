var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.use("/about",function(req,res){
    console.log("bufferviewer log");
    res.send("This is bufferContentViewer");
});

module.exports = app;