const express = require('express');
const ordersRouter = express.Router();

const Order = require('../models/order');

ordersRouter.post('/',  function (req, res) {
  const newOrder = new Order({ title: req.body.title, price: req.body.price });
  newOrder.save();
  res.sendFile(__dirname + '/index.html');
  res.end();
});

ordersRouter.get('/', function (req, res) {
  const query = req.query ? req.query : {};
  const orders = Order.find(query).then(function (data) {
    res.send({data:data});
    res.end();
  });
});

ordersRouter.get('/:_id', function (req, res) {
  const orders = Order.findById({ _id: req.params._id }).exec(function (err, data) {
    res.send({data:data});
    res.end();
  });
});

module.exports = ordersRouter;
