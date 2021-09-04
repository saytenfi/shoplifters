const { Router } = require("express");
const router = Router();
bodyParser = require('body-parser');
cookieParser = require('cookie-parser');

const authenticate = require('../middleware/auth');
const authorize = require('../middleware/isAdmin');
const errorHandler = require('../middleware/ErrorReport');

router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());
router.use(cookieParser());

router.use(async (req, res, next) => {
    console.log(`${req.method} ${req.path} at ${new Date()}`);
    console.log('BODY > ', req.body)
    next();
  });

router.get('/signup',(req,res,next) => {
  res.render('signup');
});

router.get('/resetPassword',(req,res,next) => {
  res.render('resetPassword');
});

router.get('/verifyPassword/:token',(req,res,next) => {
  res.render('verifyPassword', {token: req.params.token});
});

router.use('/register', require('./signup'));
router.use('/login', require('./login'));
router.use('/password', require('./resetPassword'));

router.use('/', (req, res, next) => {
  if(req.path === '/') {
    res.render('index');
  } else {
    next();
  }
});

router.use(authenticate.isAuthenticated);

router.get('/home', (req,res,next) => {
  if(req.user.role === 'admin') {
    res.status(200).render('adminHome', {user: req.user});  
  } else {
    res.status(200).render('home', {user: req.user});
  }
});

router.use('/myOrders', require('./myOrders'));
router.use('/products', require('./product'));
router.use('/orderCreate', require('./orderCreate'));
router.use('/signout',require('./signout'));

router.use(authorize.isAdmin);
router.use('/admin', require('./admin'));

router.use(errorHandler);

module.exports = router;