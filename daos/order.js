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
      const order = await orderModel.deleteOne({
        _id: input._id,
      });
      res.send("order deleted from db");
    }
  } catch (err) {
    res.send("order not found");
  }
};
