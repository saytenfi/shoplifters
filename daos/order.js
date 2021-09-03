const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

module.exports = {};

module.exports.getAll = async () => {
  return await Order.find().lean();
}
  
module.exports.getAllByUserId = async (user_id) => {
  try {
    const userOrder = await Order.aggregate([
      { $match: {userId: mongoose.Types.ObjectId(user_id)}},
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "orderProducts"
        }
      },
      { $unwind: "$orderProducts" },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          products: { $push: "$orderProducts"},
          orderTotal: { $first: "$orderTotal" },
          isActive: { $first: "$isActive" }
        }
      },
      {
        $project: {
          _id: 1,
          products: {
            __v: 0
          }
        }
      }
    ]);

    return userOrder;

  } catch(e) {
    throw e;
  }
}

module.exports.getUserActiveOrder = async (userId) => {
  return await Order.find({userId: userId, isActive: true}).lean();
}
    
module.exports.create = async (order) => {
  try {
    const created = await Order.create(order);
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

  const id = orderData._id;
  delete orderData._id;
  
  const updated = await Order.findOneAndUpdate({ _id: id }, orderData);
  return updated;

}
  

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;