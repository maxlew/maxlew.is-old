#!/usr/bin/env node

var https = require('https');
var fs = require('fs');
var express = require('express');
var app = module.exports.app = express();

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/maxlew.is/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/maxlew.is/fullchain.pem')
};

var server = https.createServer(options, app);

server.listen(443, function () {
  console.log('listening on maxlew.is:433');
});


var io = require('socket.io').listen(server);
var compression = require('compression')

app.get('/', function (req, res) {
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));
app.use(compression())

app.use(function (req, resp, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
    return resp.redirect(301, 'https://' + req.headers.host + '/');
  } else {
    return next();
  }
});



io.on('connection', function (socket) {
  socket.on('notePlayed', function (data) {
    console.log('notePlayed', data);
    socket.broadcast.emit('notePlayed', data.note);
  });
});
