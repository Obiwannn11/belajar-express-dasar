const express = require('express')

// indexcontroller hanyalah sebuah controller untuk menangani crud simple, yaitu Create,Read,Update,Delete
const IndexController = require('../controller/indexController.js')

const indexCRUD = (model) => {
    const router = express.Router()
    const Index = new IndexController(model)

    router.get('/', Index.index)
    router.get('/:id', Index.show)
    router.post('/', Index.store)
    router.put('/:id', Index.update)
    router.delete('/:id', Index.delete)

    return router

}

module.exports = indexCRUD;