function productsController(Product) {

  function productsPost (req, res) {
    const { title, description, weight, price, categoryId } = req.body;
    if (!title || !description || !categoryId || !weight || !price) {
      res.status(400).send('order not found');
      return;
    }
    const newProduct = new Product({ title, description, weight, price, categoryId });
    newProduct.save();
    res.send({message: "Product has been added"});
  }

  function productsGet (req, res) {
    const query = req.query ? req.query : {};
    const products = Product.find(query).then(function (data) {
      res.send({data:data});
      res.end();
    });
  }

  function productsGetByCategoryId (req, res) {
    const products = Product.find({ categoryId : req.params.categoryId }).exec(function (err, data) {
      if (err) {
        res.status(400);
      } else {
          res.send({data:data});
          res.end();
      }
   })
  }

  function productsGetById (req, res) {
    const products = Product.find({ _id : req.params._id }).exec(function (err, data) {
      if (err) {
        res.status(400);
      } else {
          res.send({data:data});
          res.end();
      }
   })
  }

  return {
    post: productsPost,
    get: productsGet,
    getByCategoryId: productsGetByCategoryId,
    getById: productsGetById,
  }
}

module.exports = productsController;
