// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const OTPVerifiy = require('../model/otp.schema');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'dhrutip2005@gmail.com',
//     pass: 'wkzj insl fwae snek' 
//   }
// });

// const sendOTP = async (req, res) => {
//   const { email } = req.body;
//   const otp = crypto.randomInt(100000, 999999).toString();
//   const mailOptions = {
//     from: 'dhrutip2005@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is ${otp}`
//   };
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('OTP sent:', otp);
//     await OTPVerifiy.create({ email, otp });
//     res.redirect('/auth/verifyOTP');
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).send('Error sending OTP');
//   }
// };

// const verifyOTPForm = (req, res) => {
//   res.render('Pages/verifyOTPForm');
// };

// const verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;
//   const otpRecord = await OTPVerifiy.findOne({ email, otp });
//   if (otpRecord) {
//     res.redirect('/');
//   } else {
//     res.status(400).send('Invalid OTP');
//   }
// };

// module.exports = { sendOTP, verifyOTPForm, verifyOTP };

// auth.controller.js


const nodemailer = require('nodemailer');
const crypto = require('crypto');
const OTPVerifiy = require('../model/otp.schema');
const passport = require('passport');
const userModel = require("../model/usermodel");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhrutip2005@gmail.com',
    pass: 'wkzj insl fwae snek' 
  }
});

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  const mailOptions = {
    from: 'dhrutip2005@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent:', otp);
    await OTPVerifiy.create({ email, otp });
    res.redirect('/auth/verifyOTP');
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send('Error sending OTP');
  }
};

const verifyOTPForm = (req, res) => {
  res.render('Pages/verifyOTPForm');
};

const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  const otpRecord = await OTPVerifiy.findOne({ email, otp });
  if (otpRecord) {
    // OTP is correct, log in the user
    const user = await userModel.findOne({ email });
    if (!user) {
      console.error("verifyOTP: User not found with email", email);
      return res.status(400).send('User not found');
    }
    console.log("verifyOTP: User found", user);
    req.login(user, (err) => {
      if (err) {
        console.error("verifyOTP: Error in req.login", err);
        return next(err);
      }
      return res.redirect('/');
    });
  } else {
    res.status(400).send('Invalid OTP');
  }
};

module.exports = { sendOTP, verifyOTPForm, verifyOTP };
