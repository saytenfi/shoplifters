const mongoose = require("mongoose");
const users = mongoose.model("users");
const nodemailer = require("nodemailer");
const userModel = require("../models/users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
// const transporter = nodemailer.createTransport(
//   sendTrans({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );
module.exports.userExist = async (req, res, next) => {
  console.log("In reset");
  // transporter.sendMail({
  //   to: "zeeshanahmed3597@gmail.com",
  //   from: "sp17bsed@gmail.com",
  //   subject: "reset",
  //   html: "<h1>hhh</h1>",
  // });

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
        res.json({ message: "check your email" });
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
      bcrypt
        .hash(newpassword, 12)
        .then((hashedpassword) => {
          user.password = hashedpassword;
          (user.confirmPassword = hashedpassword),
            (user.expireToken = undefined);
          user.resetToken = undefined;
          user.save().then((saved) => {
            res.json({ message: "password saved successfully" });
          });
        })
        .catch((err) => {
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
  const urlLink = "http//localhost/9000/verifypassword/:" + token;
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
