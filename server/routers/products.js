const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/product');
const productsController = require('../controllers/productsController')(Product);

productsRouter.post('/', productsController.post);
productsRouter.get('/', productsController.get);
productsRouter.get('/category/:categoryId', productsController.getByCategoryId)
productsRouter.get('/:_id', productsController.getById)

module.exports = productsRouter;
