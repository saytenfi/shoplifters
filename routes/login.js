const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.JWT_SECRET;

const userDAO = require('../daos/users');

router.use(async (req, res, next) => {
    console.log(`Login > ${req.method} ${req.path} at ${new Date()}`);
    console.log('USER > ', req.body)
    next();
});

router.get('/', async (req,res,next) => {
    res.status(200).render('index');
});

router.post('/', async (req, res, next) => {
    try {
        let { email, password } = req.body;

        if (!email || !password || email.length === 0 || password.length === 0) {
            throw new Error('Field is required');
        }
     
        const user = await userDAO.getUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        } else {
            
            const pwdMatch = await bcrypt.compare(password, user.password);
            const isAdmin = user.role === 'admin' ? true : false;
            
            let jwtUser = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName 
            };

            jwtUser = {
                ...jwtUser,
                ...(isAdmin && {role: 'admin'}),
            }

            console.log('JWTUSER > ',jwtUser);

            if(pwdMatch) {

                const tokenStr = jwt.sign(jwtUser,secret, {
                    expiresIn: '30min'
                });
                
                res.cookie('AuthToken',`Bearer ${tokenStr}`);                    
                res.redirect('/home')
                
            } else {
                throw new Error('Password match failed');
            }
        }
  } catch (e) {
    next(e);
  }
});

module.exports = router;