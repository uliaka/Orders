
function ordersController(Order) {

  function ordersGetMiddleware (req, res, next) {
     Order.findById({ _id: req.params._id }).exec(function (err, data) {
       if (err) {
         res.status(400).send('order not found!');
       } else {
         req.order = data;
         next();
       }
    });
  }

  function ordersPost (req, res) {
    const newOrder = new Order({ title: req.body.title, price: req.body.price });
    newOrder.save();
    res.sendFile(process.env.PWD + '/public/index.html');
  }


  function ordersGet (req, res) {
    const query = req.query ? req.query : {};
    const orders = Order.find(query).then(function (data) {
      res.send({data:data});
      res.end();
    });
  }

  function ordersGetById (req, res) {
    const order = req.order;
    res.send({order:order});
    res.end();
  }

  function ordersPut (req, res) {
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
  }

  return {
    ordersGetMiddleware,
    post: ordersPost,
    get: ordersGet,
    getById: ordersGetById,
    put: ordersPut,
  }
}

module.exports = ordersController;
