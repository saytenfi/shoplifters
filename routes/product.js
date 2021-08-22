const { Router } = require('express');
const router = Router();
const productDAO = require('../daos/product');
const errorHandler = require('../middleware/ErrorReport');

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

router.use(errorHandler);

module.exports = router;
