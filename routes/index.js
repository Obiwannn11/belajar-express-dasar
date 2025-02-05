const express = require('express');
// route asal
const IndexCRUD = require('./indexRoute'); // Pastikan path sesuai

//model
const { User } = require('../database/models'); // Pastikan ini benar

const router = express.Router();

// Tambahkan semua rute di sini
router.use('/user', IndexCRUD(User));
router.use('/login', IndexCRUD(User));


// Bisa tambahkan rute lain di sini jika ada

module.exports = router;


