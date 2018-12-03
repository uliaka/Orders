const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/product');

productsRouter.post('/', function productsPost (req, res) {
  const { title, description, weight, price, categoryId } = req.body;
  if (!title || !description || !categoryId || !weight || !price) {
    res.status(400).send('order not found');
    return;
  }
  const newProduct = new Product({ title, description, weight, price, categoryId });
  newProduct.save();
  res.send({message: "Product has been added"});
});

productsRouter.get('/', function productsGet (req, res) {
  const query = req.query ? req.query : {};
  const products = Product.find(query).then(function (data) {
    res.send({data:data});
    res.end();
  });
})

module.exports = productsRouter;
