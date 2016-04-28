'use strict';

var PORT = 8080;
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var qs = require('querystring');
var http = require("http");
var url = require('url');
var shuffle = require('shuffle-array');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
  var files = _getAllFilesFromFolder(__dirname + "/public/food-images");

});

app.get('/files',function(req,res){
  var files = _getAllFilesFromFolder(__dirname + "/public/food-images");
  shuffle(files);
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(res.statusCode);
  res.write(files.toString());
  res.end();

});

app.get('/computeResult',function(req,res){
  var data = fs.readFileSync('output.txt');
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(res.statusCode);
  res.write(data.toString());
  res.end();
  
});

app.listen(PORT);
console.log('Server listenning on port ' + PORT);

var _getAllFilesFromFolder = function(dir) {

    var results = [];

    fs.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });
    return results;
};
