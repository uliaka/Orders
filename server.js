var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log(err)
});
db.once('open', function() {
  console.log('connection is open')
});
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
