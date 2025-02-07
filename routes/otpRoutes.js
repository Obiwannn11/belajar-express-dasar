const express = require('express')

// indexcontroller hanyalah sebuah controller untuk menangani crud simple, yaitu Create,Read,Update,Delete
const otpController = require('../controller/otpController')

const OTP = (model) => {
    const router = express.Router()
    const otp = new otpController(model)

    //cek isi database
    router.get('/', otp.verifyOtp);    

    return router;

}

module.exports = OTP;