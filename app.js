#!/usr/bin/env node
const http 	= require('http');
const express = require('express');
const app = module.exports.app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.get('/', function (req, res) {
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));

server.listen(80, function () {
  console.log('listening');
});


io.on('connection', function (socket) {
  console.log('testing');
});
