const express = require("express");
const router = express.Router();
const order = require("../daos/order");

router.get("/order:id", order.getOrder);
router.delete("/delete:id", order.deleteOrder);
module.exports = router;
