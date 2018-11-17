const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const Order = require('./server/models/order');

const db = mongoose.connection;
db.on('error', function(err) {
  console.log(err)
});
db.once('open', function() {
  console.log('connection is open')

//  const newOrder = new Order({ title: 'awesome order 2', price: 30 });
//  newOrder.save();

});
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
