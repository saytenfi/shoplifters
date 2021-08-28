const mongoose = require('mongoose');
const Product = require('../models/product');

module.exports= {};

module.exports.createProduct = async(productObj) => {
  try {
    const createdProduct = await Product.create(productObj);
    return createdProduct;
  } catch(e) {
    throw e
  }
}

module.exports.updateProduct = async (productId, productObj) => {
  try {
    const updatedProduct = await Product.updateOne({ _id: productId }, productObj);
    return updatedProduct;
  } catch (e) {
    throw e
  }
};

