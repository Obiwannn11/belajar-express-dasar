const express = require('express');
// route asal
const IndexCRUD = require('./indexRoute'); // Pastikan path sesuai
const Signup = require('./penggunaRoute'); // Pastikan path sesuai
const Login = require('./loginRoute'); // Pastikan path sesuai
const otp = require('./otpRoutes'); // Pastikan path sesuai

//model
const { User, Pengguna, OTP} = require('../database/models'); // Pastikan ini benar

const router = express.Router();

// Tambahkan semua rute di sini
router.use('/user', IndexCRUD(User));
// router.use('/login', IndexCRUD(User));
router.use('/register', Signup(Pengguna));
router.use('/login', Login(Pengguna));
router.use('/verify', otp(OTP));



// Bisa tambahkan rute lain di sini jika ada

module.exports = router;


