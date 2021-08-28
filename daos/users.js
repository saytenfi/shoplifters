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

module.exports.getUserById = async (userId) => {
  try {
    const existingUser = await login_Controller1.findOne({ _id: userId}).lean();
    return existingUser;
  } catch(e) {
    throw e;
  }
}

module.exports.userRegister = async (req, res, next) => {
  try
  {
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

    const user = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      lastName: lastName,
      firstName: firstName
    };

    const savedUser = await login_Controller1.findOne({email: email}).lean();
    if(savedUser) {
      next(new Error('duplicate key'));
    } else {
      const createdUser = await login_Controller1.create(user);
      if(createdUser) {
        res.redirect(307, '/login');
      } else {
        throw new Error('Could not create user');
      }
    }
  }

  catch(e) {
    next(e);
  }
};
