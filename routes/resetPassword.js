const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reset_password = require("../daos/resetpassword");

router.post("/password", reset_password.userExist);
router.post("/new-password", reset_password.newPassword);
module.exports = router;
