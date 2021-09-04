const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true  },
  isActive: { type: Boolean, required: true },
  orderTotal: { type: Number, required: true},
  products: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }], required: true},
  isCanceled: { type: Boolean }
});

module.exports = mongoose.model("orders", orderSchema);