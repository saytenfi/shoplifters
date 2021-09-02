const { Router } = require("express");
const router = Router();

const productsDAO = require('../daos/product');
const userDAO = require('../daos/users');
const ordersDAO = require('../daos/order');

const errorReport = require("../middleware/ErrorReport");

router.use(async (req, res, next) => {
    console.log('ORDER ROUTE');
    console.log(`${req.method} ${req.path} at ${new Date()}`);
    next();
});

/////////////////////////////////////////////////////////////////////////
//   Due to the HTML limitation for UPDATING, we are using a POST
//   to perform updates as well as creating an order
/////////////////////////////////////////////////////////////////////////
router.post("/create", async (req, res, next) => {
    try {
        const { quantity , product } = req.body;
        const user = await userDAO.getUserByEmail(req.user.email);
        const order = await ordersDAO.getUserActiveOrder(user._id);
        const productData = await productsDAO.getProductById(parseInt(product));

        if(order.length === 0 ) {
            console.log('-- Order not exists --');
            let products = [];
            for(let idx=0; idx <= quantity-1; idx++) {
                products.push(productData._id);
            }

            const orderObj = {
                userId: user._id,
                isActive: true,
                orderTotal: productData.price * quantity,
                products: products
            };

            const createdOrder = await ordersDAO.create(orderObj);

            if(createdOrder) {
                res.redirect('/products');
            } else {
                res.status(404).render('error',{message: `Could not create order`});
            }
        } else {
            console.log('-- Order exists --');
            const newOrder = order[0];
            const orderProducts = newOrder.products;

            for(let idx=0; idx <= quantity-1; idx++) {
                orderProducts.push(productData._id);
            }

            newOrder.products = orderProducts;
            newOrder.orderTotal = newOrder.orderTotal + (productData.price * quantity);

            const updatedOrder = await ordersDAO.updateById(newOrder);
            if(updatedOrder) {
                res.redirect('/products');
            } else {
                res.status(404).render('error',{message: `Could not update order`});
            }
        }
    } catch(e) {
        console.log(e);
        next(e);
    }
});
  
router.post("/checkout", async (req, res, next) => {
    try {
        const order = await ordersDAO.getById(req.body.order);
        order.isActive = false;

        const updatedOrder = await ordersDAO.updateById(order);
        if(updatedOrder) {
            res.redirect('/home');
        } else {
            res.status(404).render('error',{message: `Could not update order`});
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

// router.put("/:id", async (req, res, next) => {
//     try {
//         const updatedOrder = await ordersDAO.updateById(req.body);
//         if(!updatedOrder) {
//             throw new Error('Could not update order');
//         } else {
//             res.json(updatedOrder);
//         }
//     } catch(e) {
//         next(e);
//     }
// });

router.use(errorReport);

module.exports = router;
  
  
