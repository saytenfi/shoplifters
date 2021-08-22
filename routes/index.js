const { Router } = require("express");
const router = Router();

// const auth = require('../middleware/auth');
const errorHandler = require('../middleware/ErrorReport');

router.use(async (req, res, next) => {
    console.log(`${req.method} ${req.path} at ${new Date()}`);
    next();
  });

router.get('/signup',(req,res,next) => {
  res.render('signup');
});

router.use('/register', require('./signup'));
router.use('/login', require('./login'));
// router.use(auth.isAuthenticated);
// router.use('/password', require('./resetPassword'));

router.use('/', (req, res, next) => {
  res.render('index');
});

router.use(errorHandler);

module.exports = router;