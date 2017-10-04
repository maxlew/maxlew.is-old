#!/usr/bin/env node

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('dist'));

app.listen(80, function () {
  console.log('listening');
});
