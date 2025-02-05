const express = require('express')

// indexcontroller hanyalah sebuah controller untuk menangani crud simple, yaitu Create,Read,Update,Delete
const IndexController = require('../controller/indexController.js')

const Signup = (model) => {
    const router = express.Router()
    const Signup = new IndexController(model)

    router.get('/', Signup.index)
    // router.get('/:id', Index.show)
    router.post('/', Signup.store)
    // router.put('/:id', Index.update)
    // router.delete('/:id', Index.delete)

    return router;

}

module.exports = Signup;