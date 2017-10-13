#!/usr/bin/env node

var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');
var helmet = require('helmet');
var app = module.exports.app = express();

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/maxlew.is/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/maxlew.is/fullchain.pem')
};

var secureServer = https.createServer(options, app).listen(443);
var server = http.createServer(app).listen(80);

var io = require('socket.io').listen(secureServer);
var compression = require('compression')

app.use(compression());
app.use(helmet());

app.all('*', ensureHTTPS)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));

function ensureHTTPS(req, resp, next) {
  if (req.secure) {
    return next();
  }
  resp.redirect('https://' + req.headers.host)
}

io.on('connection', function (socket) {
  socket.on('notePlayed', function (data) {
    socket.broadcast.emit('notePlayed', data.note);
  });
});
