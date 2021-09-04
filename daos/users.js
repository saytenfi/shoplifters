const bcrypt = require("bcrypt");
const login_Controller1 = require("../models/users");
const mongoose = require('mongoose');

module.exports = {};

module.exports.getAllUsers = async () => {
  return await login_Controller1.find().lean();
};

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
};

module.exports.updateUserById = async (user_id, userObj) => {
  try {
    const updatedUser = await login_Controller1.updateOne({ _id: user_id}, userObj).lean();
    return updatedUser;
  } catch(e) {
    throw e;
  }
};

module.exports.deleteById = async (user_id) => {

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return false;
  };
  
  await login_Controller1.deleteOne({_id: user_id});
  return true;

};

module.exports.getBySearchString = async (searchStr) => {
  try {
    const users = await login_Controller1.find(
      { $text: { $search: searchStr, $caseSensitive: false }},
      {score: { $meta: "textScore" }}
    ).sort({ score: { $meta: "textScore" }}
    ).lean();

    console.log(users);
    return users;
    
  } catch(e) {
    throw e;
  }
}

module.exports.userRegister = async (req, res, next) => {
  try
  {
    console.log("registered", req.body);
    let { email, firstName, lastName, password, confirmPassword, role } = req.body;
  
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

    let user = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      lastName: lastName,
      firstName: firstName
    };

    user = {
      ...user,
      ...(role === 'admin' && {role: 'admin'})
    }

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
