const bcrypt = require("bcrypt");
const login_Controller1 = require("../models/users");

module.exports = {};

module.exports.getUserByEmail = async (userEmail) => {
  try {
    const existingUser = await login_Controller1.findOne({email: userEmail}).lean();
    return existingUser;
  } catch(e) {
    throw e;
  }
}

module.exports.userRegister = async (req, res, next) => {
  try
  {
    console.log('params', req.params);
    console.log("registered", req.body);
    let { email, firstName, lastName, password, confirmPassword } = req.body;
  
    if (!email || !password || !firstName || !lastName || !confirmPassword
      || email.length === 0 || password.length === 0
      || firstName.length === 0 || lastName.length === 0
      || confirmPassword.length === 0
    ) {
      throw new Error(`Field is required`);
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    password = hash;
  
    let csalt = await bcrypt.genSalt(10);
    let chash = await bcrypt.hash(confirmPassword, csalt);
    confirmPassword = chash;
  
    await login_Controller1.findOne({ email: email }).then((saveduser) => {
      if (saveduser) {
        next(new Error('duplicate key'));
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
        res.json("Admin saved");
      });
    });

    next();
  }
  catch(e) {
    next(e);
  }
};
