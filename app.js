#!/usr/bin/env node
var http 	= require('http');
var express = require('express');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var compression = require('compression')

app.get('/', function (req, res) {
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));
app.use(compression())

server.listen(80, function () {
  console.log('listening');
});


io.on('connection', function (socket) {
  socket.on('notePlayed', function (data) {
    console.log('notePlayed', data);
		socket.broadcast.emit('notePlayed', data.note);
	});
});
