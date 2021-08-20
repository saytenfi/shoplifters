const { Router } = require("express");
const router = Router();

const auth = require('../middleware/auth');
const errorHandler = require('../middleware/ErrorReport');

const filter = (path, middleware) => {
    return function(req, res, next) {
        if(path === req.path) {
            return next(new Error('Route not defined'));
        } else {
            return middleware(req, res, next);
        }
    }
};

router.use(filter('/login/logout', require('./login')));

router.use('/signup', require('./signup'));
router.use(auth.isAuthenticated);
// router.use('/', require('./login'));
// router.use('/items', require('./items'));
// router.use('/orders', require('./orders'));
router.use(errorHandler);

module.exports = router;