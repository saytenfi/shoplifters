const express = require("express");
const router = express.Router();

const reset_password = require("../daos/resetpassword");

router.post("/", reset_password.userExist);
router.post("/new-password", reset_password.newPassword);

module.exports = router;
