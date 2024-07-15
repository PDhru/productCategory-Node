const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTPForm, verifyOTP } = require('../controller/auth.controller');

router.get('/emailForm', (req, res) => res.render('pages/emailForm'));
router.post('/sendOTP', sendOTP);
router.get('/verifyOTP', verifyOTPForm);
router.post('/verifyOTP', verifyOTP);

module.exports = router;


