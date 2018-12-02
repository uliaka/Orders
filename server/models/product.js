const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  description: String,
  categoryId: String,
  weight: Number,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);
