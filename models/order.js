const mongoose = require('mongoose');

const Order = require('./order');

const orderSchema = new mongoose.Schema({
  text: { type: String, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: Order, required: true }
});

noteSchema.index({ Order: 1});

module.exports = mongoose.model("Order", orderSchema);