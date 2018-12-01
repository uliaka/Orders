const express = require('express');
const ordersRouter = express.Router();
const Order = require('../models/order');
const ordersController = require('../controllers/ordersController')(Order);

ordersRouter.use('/:_id', ordersController.ordersGetMiddleware);
ordersRouter.post('/', ordersController.post);
ordersRouter.get('/', ordersController.get);
ordersRouter.get('/:_id', ordersController.getById);
ordersRouter.put('/:_id', ordersController.put);

module.exports = ordersRouter;
