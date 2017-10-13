#!/usr/bin/env node

var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');
var app = module.exports.app = express();

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/maxlew.is/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/maxlew.is/fullchain.pem')
};

var secureServer = https.createServer(options, app).listen(443);
var server = http.createServer(app).listen(80);

var io = require('socket.io').listen(secureServer);
var compression = require('compression')

app.all('*', ensureHTTPS)

app.get('/', function (req, res) {
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));
app.use(compression())

function ensureHTTPS (req, resp, next) {
  if (req.seq) {
    return next();
  }
  res.redirect('https://' + req.hostname + req.url);
}

io.on('connection', function (socket) {
  socket.on('notePlayed', function (data) {
    console.log('notePlayed', data);
    socket.broadcast.emit('notePlayed', data.note);
  });
});
