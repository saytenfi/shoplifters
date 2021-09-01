const { Router } = require('express');
const router = Router();

const orderDAO = require('../daos/order');

router.use(async (req, res, next) => {
    console.log(`Login > ${req.method} ${req.path} at ${new Date()}`);
    console.log('USER > ', req.body)
    next();
});

router.get('/', async (req,res,next) => {
    const userOrders = await orderDAO.getAllByUserId(req.user._id);
    res.status(200).render('myOrders', {orders: userOrders});
});

module.exports = router;