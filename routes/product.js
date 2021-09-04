const { Router } = require('express');
const router = Router();
const productDAO = require('../daos/product');
const errorHandler = require('../middleware/ErrorReport');

router.use(async (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date()}`);
  next();
});

//DELETE PRODUCT//
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
    res.json(deleted);
    
  } catch(e) {      
    next(e);
  }
});

router.get('/search', async (req, res, next) => {

  try{
    const searchStr = req.query.search;

    if(!searchStr) {
      res.redirect('/products');
    } else {
      const stored = await productDAO.getBySearchString(searchStr);
      res.status(200).render('products', {products: stored});
    }
 
  } catch(e) {
    res.status(404).render('error');
  }
});

//GET PRODUCTS//
router.get('/', async (req, res, next) => {
  try{
    const stored = await productDAO.getAllProducts();
    res.status(200).render('products', {products: stored}); 
  } catch(e) {
    res.status(404).render('error');
  }
});

//UPDATE PRODUCT// 
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

router.use(errorHandler);

module.exports = router;
