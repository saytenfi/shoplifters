const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true  },
  products: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }], required: true}
});

// orderSchema.index({ Order: 1});

module.exports = mongoose.model("orders", orderSchema);