const { Router } = require("express");
const router = Router();

const productsDAO = require('../daos/product');
const userDAO = require('../daos/users');
const ordersDAO = require('../daos/order');

const errorReport = require("../middleware/ErrorReport");
const order = require("../models/order");

router.use(async (req, res, next) => {
    console.log('ORDER ROUTE');
    console.log(`${req.method} ${req.path} at ${new Date()}`);
    next();
  });

// router.use(isLoggedIn);

router.post("/:id", async (req, res, next) => {
    try {      
        const reqBody = req.params.id;

        console.log(reqBody);
        if (reqBody){
            const productData = await productsDAO.getByIds(reqBody);
            console.log(productData)

            if (productData && productData.length != 0){
                let total = 0;
                let products = [];
                reqBody.forEach(idToAdd => { 
                    productData.find((product) => {
                        if (product._id == idToAdd){
                            product.push(product);
                            // total += product.price;
                        }
                    });
                });

                if (reqBody.length != product.length) {
                    throw new Error('item not found')
                }
                const orderData = {
                    userId: req.user._id,
                    products: products,
                    total: total
                };
                console.log(orderData);

                const created = await ordersDAO.create(orderData);
                if(created)
                {
                    res.render('products', {order: created});
                }
            } else {
                throw new Error('Item not found');
            }
        } else {
            next();
        }
    } catch(e) {      
      next(e);
    }
  });

 router.get("/", async (req, res, next) => {
    try {
        if (!req.tokenIsValid) { 
            throw new Error('Token is Invalid');
        }
        if (req.isAdmin) {
            const orders = await ordersDAO.getAll();
            res.json(orders);
        } else {
            const orders = await ordersDAO.getAllByUserId(req.user._id);
            res.json(orders);
        }
    } catch(e) {      
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        if (!req.tokenIsValid) { 
            throw new Error('Token is Invalid');
        }
        const orderId = req.params.id;
        console.log(orderId);
        const order = await ordersDAO.getById(orderId);
        if (!order) {
            throw new Error("Invalid order ID");
        }

        if (!req.isAdmin){
            if (order.userId.toString() !== req.user._id.toString()) {
                throw new Error("Invalid order ID");
            }
        }
        
        res.json(order);
    } catch(e) {      
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const updatedOrder = await ordersDAO.updateById(req.body);
        if(!updatedOrder) {
            throw new Error('Could not update order');
        } else {
            res.json(updatedOrder);
        }
    } catch(e) {
        next(e);
    }
});

router.use(errorReport);

module.exports = router;
  
  
