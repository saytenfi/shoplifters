const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

const productDAO = require('../daos/product');
const userDAO = require('../daos/users');
const orderDAO = require('../daos/order');

const errorHandler = require('../middleware/ErrorReport');

router.use(async (req, res, next) => {
    console.log(`Login > ${req.method} ${req.path} at ${new Date()}`);
    console.log('USER > ', req.body)
    next();
});

//ADMIN GET ALL PRODUCTS//
router.get('/products', async(req,res,next) => {
    try {
        const allProducts = await productDAO.getAllProducts();
        res.render('adminProducts',{products: allProducts});
    } catch(e) {
        next(e);
    }
});

//ADMIN GET ALL ORDERS//
router.get('/orders', async(req,res,next) => {
    try {
        const allOrders = await orderDAO.getAll();
        res.render('adminOrders',{orders: allOrders});
    } catch(e) {
        next(e);
    }
});

//ADMIN GET ALL USERS//
router.get('/users', async(req,res,next) => {
    try {
        const allUsers = await userDAO.getAllUsers();
        res.render('adminUsers',{users: allUsers});
    } catch(e) {
        next(e);
    }
});

////////////////////
// SEARCH ROUTES //
///////////////////
//ADMIN GET ALL PRODUCTS//
router.get('/products/search', async(req,res,next) => {
    try {
        const searchStr = req.query.search;
        if(!searchStr) {
            res.redirect('/admin/products');
        } else {
            const searchedProducts = await productDAO.getBySearchString(searchStr);
            res.render('adminProducts',{products: searchedProducts});
        }
    } catch(e) {
        next(e);
    }
});

//ADMIN GET ALL ORDERS//
router.get('/orders/search', async(req,res,next) => {
    try {
        const searchStr = req.query.search;
        if(!searchStr) {
            res.redirect('/admin/orders');
        } else {
            const searchedOrders = await orderDAO.getBySearchString(searchStr);
            res.render('adminOrders',{orders: searchedOrders});
        }
    } catch(e) {
        next(e);
    }
});

//ADMIN GET ALL USERS//
router.get('/users/search', async(req,res,next) => {
    try {
        const searchStr = req.query.search;
        if(!searchStr) {
            res.redirect('/admin/users');
        } else {
            const searchedUsers = await userDAO.getBySearchString(searchStr);
            res.render('adminUsers',{users: searchedUsers});
        }
    } catch(e) {
        next(e);
    }
});

////////////////////
// CREATE PRODUCT //
router.get('/products/new', async (req, res, next) => {
    try{
        const product = await productDAO.getMaxProductId();
        if(product) {
            res.render('adminNewProduct',{maxId: product+1});
        }
    } catch(e) {
        next(e);
    }
});

router.post('/products/new', async (req, res, next) => {
    try{
      const reqProduct = req.body;
      const product = await productDAO.createProduct(reqProduct);
      if(product) {
        res.status(200).redirect('/admin/products');
      }
    } catch(e) {
      next(e);
    }
});

////////////////////////////
// UPDATE & DELETE ROUTES //
////////////////////////////
router.post('/products/update', async (req,res,next) => {
    let { imageUrl, title, price, description, category, id } = req.body;

    const product = await productDAO.getProductById(parseInt(id));

    const pObj = {
        image: imageUrl !== '' ? imageUrl : product.image,
        title: title !== '' ? title : product.title,
        price: price !== '' ? price : product.price,
        description: description !== '' ? description : product.description,
        category: category !== '' ? category : product.category,
    }

    const updatedProduct = await productDAO.updateProduct(product._id, pObj);
    
    if(updatedProduct) {
        res.redirect('/admin/products');
    } else {
        res.status(500).render('error');
    }
});


//DELETE PRODUCT --> USING POST DUE TO HTML FORM LIMITATIONS
router.post('/products/delete', async (req,res,next) => {
    const product = await productDAO.getProductById(parseInt(req.body.id));

    console.log(product);
    const removedProduct = await productDAO.deleteById(product._id);
    
    if(removedProduct) {
        res.redirect('/admin/products');
    } else {
        res.status(500).render('error');
    }
});

router.post('/users/update', async (req,res,next) => {
    let { firstName, lastName, email, isAdmin, id } = req.body;

    const user = await userDAO.getUserById(mongoose.Types.ObjectId(id));
    const existingEmail = await userDAO.getUserByEmail(email);

    if(existingEmail) {
        if(user._id !== existingEmail._id) {
            res.render('error', {message: {hdr: "Used Email", msg: `'${email}' is already used`}});
        }
    } else {
        const admin = isAdmin === 'on' ? true : false;

        let uObj = {
            email: email !== '' ? email : user.email,
            firstName: firstName !== '' ? firstName : user.firstName,
            lastName: lastName !== '' ? lastName : user.lastName,
            ...(admin && {role: 'admin'}),
        }

        const updatedUser = await userDAO.updateUserById(user._id, uObj);
        
        if(updatedUser) {
            res.redirect('/admin/users');
        } else {
            res.status(500).render('error',{message: {hdr: "OOPS! Something Broke!", msg: "Let's try again."}});
        }
    }
});

//DELETE USER --> USING POST DUE TO HTML FORM LIMITATIONS
router.post('/users/delete', async (req,res,next) => {
    
    const removedUser = await userDAO.deleteById(mongoose.Types.ObjectId(req.body.id));
    
    if(removedUser) {
        res.redirect('/admin/users');
    } else {
        res.status(500).render('error',{message: {hdr: "OOPS! Something Broke!", msg: "Let's try again."}});
    }
});


router.use(errorHandler);

module.exports = router;