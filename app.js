const express = require('express')
const app = express()

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist'));
  console.log('something');
})

app.listen(80, function () {
  console.log('listening');
})
