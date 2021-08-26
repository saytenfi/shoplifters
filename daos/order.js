const mongoose = require('mongoose');

const Order = require('../models/order');

module.exports = {};

module.exports.getById = async (orderId) => {
  return await Order.findOne({ _id: orderId }).populate("items").lean();
}
    
module.exports.getAll = async () => {
  return await Order.find().lean();
}
  
module.exports.getAllByUserId = async (userId) => {
  return await Order.find({userId: userId}).lean();
}
    
module.exports.create = async (itemData) => {
try {
    const created = await Order.create(itemData);
    return created;
  } catch (e) {    
    if (e.message.includes('validation failed') || e.message.includes('duplicate key')) {
      throw new BadDataError(e.message);
    }
      throw e;
    }
}

  module.exports.updateById = async (orderData) => {
    
    if (!mongoose.Types.ObjectId.isValid(orderData._id)) {
      return null;
    }
    const updated = await Order.updateOne(orderData);
    return updated;
  }
  const mongoose = require("mongoose");
const Order = require("../models/order");
////////////////search route/////////////////
module.exports.getOrder = async (req, res, next) => {
  let input = req.params.id;
  console.log(input._id);

  try {
    const order = await Order.findOne({
      _id: input._id,
    });
    console.log(order.name, "order found in db");

    res.send(order);
  } catch (err) {
    res.send("order not found");
  }
};

////////////////////delete route////////////////
module.exports.deleteOrder = async (req, res, next) => {
  let input = req.params.id;
  console.log(input._id);

  try {
    const order = await Order.findOne({
      _id: input._id,
    });
    console.log(order.name, "order found in db");
    if (order) {
      const order = await Order.deleteOne({
        _id: input._id,
      });
      res.send("order deleted from db");
    }
  } catch (err) {
    res.send("order not found");
  }
};


class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;