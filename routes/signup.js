const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const login_Controller = require("../daos/users");

router.post("/register", login_Controller.userRegister);

module.exports = router;
//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
