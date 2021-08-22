const express = require("express");
const router = express.Router();

const login_Controller = require("../daos/users");

router.use(async (req, res, next) => {
    console.log(`Signup > ${req.method} ${req.path} at ${new Date()}`);
    next();
});

router.post("/", login_Controller.userRegister);

module.exports = router;