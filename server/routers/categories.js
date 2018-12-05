const express = require('express');
const categoriesRouter = express.Router();
const Category = require('../models/category');
const categoriesController = require('../controllers/categoriesController')(Category);

categoriesRouter.post('/', categoriesController.post);
categoriesRouter.get('/', categoriesController.get);

module.exports = categoriesRouter;
