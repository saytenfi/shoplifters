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

module.exports.getAllProducts = async () => {
  try {
    const products = await Product.find().lean();
    return products;
  } catch(e) {
    throw e;
  }
};

module.exports.getProductById = async (productId) => {
  try {
    const product = await Product.findOne({id: productId}).lean();
    return product;
  } catch(e) {
    throw e;
  }
};

module.exports.getBySearchString = async (searchStr) => {
  try {
    const products = await Product.find(
      { $text: { $search: searchStr }},
      {score: { $meta: "textScore" }}
    ).sort({ score: { $meta: "textScore" }}
    ).lean();

    return products;
    
  } catch(e) {
    next(e)
  }
}

module.exports.getByIds = async (productIds) => {
  try {
    const product = await Product.find({id: productIds}).lean();
    return product;
  } catch(e) {
    throw e;
  }
};

module.exports.deleteById = async (productId) => {

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return false;
  };
  
  await Product.deleteOne({_id: productId});
  return true;

};

