const express = require("express");
const router = express.Router();

const login_Controller = require("../daos/users");

router.post("/", login_Controller.userRegister);

module.exports = router;