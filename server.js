const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/test');

const Order = require('./server/models/order');

const db = mongoose.connection;
db.on('error', function(err) {
  console.log(err)
});
db.once('open', function() {
  console.log('connection is open')

 //const newOrder = new Order({ title: 'awesome order 2', price: 30 });
  //newOrder.save();

});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.post('/orders', function (req, res) {
  const newOrder = new Order({ title: req.body.title, price: req.body.price });
  newOrder.save();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
