

const mongoose = require('mongoose');
const Product = require('../models/product');

module.exports= {};

module.exports.updateProduct = async (productId, productObj) => {
  try {
    const updatedProduct = await Product.updateOne({ _id: productId }, productObj);

    return true;
  } catch (e) {
    Next(e)
  }
};

