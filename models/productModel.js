const mongoose = require('mongoose');

// tao ducument
const product = mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('products', product);