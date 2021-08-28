const { Router } = require("express");
const router = Router();
bodyParser = require('body-parser');

const auth = require('../middleware/auth');
const errorHandler = require('../middleware/ErrorReport');

router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

router.use(async (req, res, next) => {
    console.log(`${req.method} ${req.path} at ${new Date()}`);
    console.log('BODY > ', req.body)
    next();
  });

router.get('/signup',(req,res,next) => {
  res.render('signup');
});

router.use('/register', require('./signup'));
router.use('/login', require('./login'));

router.use('/', (req, res, next) => {
  if(req.path === '/') {
    res.render('index');
  } else {
    next();
  }
});

router.get('/home/:token', auth.isAuthenticated, (req,res,next) => {
  res.render('home', {user: req.user});
});

router.use('/products', require('./product'));
router.use('/orderCreate/:id', require('./orderCreate'));

// router.use('/password', require('./resetPassword'));

router.use(errorHandler);

module.exports = router;