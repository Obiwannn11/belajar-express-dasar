const express = require('express');
const dotenv = require('dotenv');
const app = express();
const env = dotenv.config().parsed;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(env.PORT, () => {
    console.log(`Server Berjalan di Port ${env.PORT}`)
})

app.get('/', (req, res) => {
    try {
        return res.status(200).json({
            status: "Sukses",
            message: "Server Berhasil Berjalan di /"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "Gagal",
            message: "Server Gagal Koneksi"
        })
        
    }
})

