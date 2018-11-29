const express = require('express');
const ordersRouter = express.Router();

const Order = require('../models/order');


ordersRouter.use('/:_id', function (req, res, next) {
  Order.findById({ _id: req.params._id }).exec(function (err, data) {
    if (err) {
      res.status(400).send('order not found!');
    } else {
      req.order = data;
      next();
    }
  });
})

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
    const order = req.order;
    res.send({order:order});
    res.end();
});

ordersRouter.put('/:_id', function (req, res) {
    const order = req.order;
    const title = req.query.title;
    if (title) {
      order.title = title;
      order.save(function (err, resultOrder){
        if (err) {
          res.send({err:err});
          res.end();
        }
        res.send({resultOrder:resultOrder});
      });
    } else {
      res.send({order:order});
      res.end();
    }
});

module.exports = ordersRouter;
