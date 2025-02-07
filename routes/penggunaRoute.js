const express = require('express')

// indexcontroller hanyalah sebuah controller untuk menangani crud simple, yaitu Create,Read,Update,Delete
const SignupController = require('../controller/penggunaController.js')

const Signup = (model) => {
    const router = express.Router()
    const SignUp = new SignupController(model)

    //cek isi database
    router.get('/', SignUp.index)
    router.post('/', SignUp.store)
    // router.delete('/:id', Index.delete)

    return router;

}

module.exports = Signup;