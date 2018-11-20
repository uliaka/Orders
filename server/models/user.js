const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', orderSchema);
