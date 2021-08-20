const mongoose = require("mongoose");
// const users = mongoose.model("users");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const login_Controller1 = require("../models/users");

module.exports.userRegister = async (req, res, next) => {
  console.log("registered", req.body);
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  password = hash;

  let csalt = await bcrypt.genSalt(10);
  let chash = await bcrypt.hash(confirmPassword, csalt);
  confirmPassword = chash;

  if (!email || !password) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  // let saveUser = await login_Controller1.findOne({email: email}).lean();

  await login_Controller1.findOne({ email: email }).then((saveduser) => {
    if (saveduser) {
      return res
        .status(422)
        .json({ error: "user already exists with that email" });
    }

    let user = new login_Controller1({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      lastName: lastName,
      firstName: firstName,
    });
    
    user.save().then((res1) => {
      console.log(res1);
      res.send("Admin saved");
    });
  });
};
