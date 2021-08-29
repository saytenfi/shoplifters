const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = async (req, res, next) => {
    try {
        console.log('AUTH', req.cookies['AuthToken']);
        const bearer = req.cookies['AuthToken'];

        if(bearer) {
            const token = bearer.replace('Bearer ', '');
            const user = jwt.verify(token, process.env.JWT_SECRET);

            if(user) {
                req.user = user;
                next();
            } else {
                throw new Error('User not logged in');
            }
        } else {
            throw new Error('Bad Token');
        }
    } catch(e) {
        next(e);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if(user.role === 'admin') {
            next();
        } else {
            throw new Error('Access Denied');
        }
    } catch(e) {
        next(e);
    }
}

module.exports = {
    isAuthenticated,
    isAdmin
};