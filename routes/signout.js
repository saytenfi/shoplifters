const { Router } = require('express');
const router = Router();
const errorHandler = require('../middleware/ErrorReport');

router.use(async (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date()}`);
  next();
});

router.get('/', async (req, res, next) => {
    try{
        const idx = req.cookies.indexOf('AuthToken'); 
        req.cookies.splice(idx,1);
        res.status(200).render('index'); 
    } catch(e) {
      res.status(404).render('error');
    }
});

router.use(errorHandler);

module.exports = router;