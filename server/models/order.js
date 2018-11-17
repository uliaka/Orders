const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  title: String,
  price: Number,
});

module.exports = mongoose.model('Order', orderSchema);
