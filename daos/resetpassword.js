const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const userModel = require("../models/users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");


module.exports.userExist = async (req, res, next) => {
  try {
    console.log("In reset");

  }
  catch(e) {
    next(e);
  }
  

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    
    const token = buffer.toString("hex");
    userModel.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "user does't exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        sendMail(user.email, token);
        res.status(200).render('index', { message: {hdr: "Email Sent.", msg: "Please check your email." }});
      });
    });
  });

};

module.exports.newPassword = async (req, res, next) => {
  const newpassword = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  const sentToken = req.body.token;

  userModel
    .findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }

      bcrypt.hash(newpassword, 5)
        .then((hashedpassword) => {
          console.log(hashedpassword);
          user.password = hashedpassword;
          (user.confirmPassword = hashedpassword),
          (user.expireToken = undefined);
          user.resetToken = undefined;
          user.save().then((saved) => {
            res.status(200).render('index',{ message: {hdr: "Password Saved", msg: "Your password was updated." }});
          });
        })
        .catch((err) => {
          res.status(500).json({error: err})
          console.log(err);
        });
    });
};

async function sendMail(email, token) {
  var transport = nodemailer.createTransport({
    host: "smtp.example.email",
    port: 587,
    service: "Gmail",
    secure: false,
    requireTLS: true,
    auth: {
      // enter your account details to send email from
      user: "endb179@gmail.com",
      pass: "Jule1234@",
    },
  });

  
  const urlLink = "https://fierce-headland-03799.herokuapp.com/verifypassword/" + token;
  var mailOptions = {
    from: "endb179@gmail.com",
    to: email,
    subject: "password reset",
    html:
      "<p> You requested for password reset </p> <h5>click in this <a href='" +
      urlLink +
      "'> Link</a> to reset password",
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}