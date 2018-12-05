function categoriesController(Category){

  function categoriesPost (req, res) {
    const { name } = req.body;
    if (!name) {
      res.status(400).send('order not found');
      return;
    }
    const newCategory = new Category({ name });
    newCategory.save();
    res.send({message: "Category has been added"});
  }

  function categoriesGet (req, res) {
    const query = req.query ? req.query : {};
    const categories = Category.find(query).then(function (data) {
      res.send({data:data});
      res.end();
    });
  }

  return {
    post: categoriesPost,
    get: categoriesGet,
  }
}

module.exports = categoriesController;
