const { Router } = require('express');
const router = Router();
const productDAO = require('../daos/product');
const errorHandler = require('../middleware/ErrorReport');



//update product 
router.put('/:id', async (req, res, next) => {
  try {
    
      const recordupdated = await productDAO.updateProduct(req.params.id, req.body);

      if (recordupdated) {
        res.json(recordupdated).sendStatus(200);
        return;
      }
    
  } catch (e) {
    next(e);
  }
});

router.use(errorHandler);
module.exports = router;
