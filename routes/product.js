const { Router } = require('express');
const router = Router();
const productDAO = require('../daos/product');
const errorHandler = require('../middleware/ErrorReport');

const productJson = require('../products.json');

router.use(async (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date()}`);
  next();
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.tokenIsValid) { 
      throw new Error('Token is Invalid');
    }
    if (!req.isAdmin) { 
      throw new Error('Not an Admin');
    }
    const itemData = {_id: req.params.id}
    const success = await productsDAO.getById(itemData);
    if (!success) {
      throw new Error("Item not found");
    }
    const deleted = await productsDAO.deleteById(itemData);
    
  } catch(e) {      
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  // const products = await productDAO.getAllProducts();
  res.render('products', {products: productJson});
})

///CREATE PRODUCT///
router.post('/', async (req, res, next) => {
  try{
    const reqProduct = req.body;
    const product = await productDAO.createProduct(reqProduct);
    if(product) {
      res.json(product);
    }
  } catch(e) {
    next(e)
  }

})

//update product 
router.put('/:id', async (req, res, next) => {
  try {
      const productUpdated = await productDAO.updateProduct(req.params.id, req.body);
      if (productUpdated) {
        res.json(productUpdated);
      }
    
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  const stored = await productDAO.getAllProducts();
  res.render('products', {products: stored});
})

// router.get('/', async (req, res, next) => {
//   // const products = await productDAO.getAllProducts();
//   res.render('products', {products: productJson});
// })

router.use(errorHandler);

module.exports = router;
