const express = require('express');
const dotenv = require('dotenv');
const app = express();
const env = dotenv.config().parsed;
const cors = require('cors');

//orm sequelize
const { sequelize } = require('./config/database');

// route
const routes = require('./routes')

//error handle

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
    credentials: true,
}));

app.listen(env.PORT, () => {
    console.log(`Server Berjalan di Port ${env.PORT}`)
})


// Route
app.use(routes);
// app.use('/', routes);


//error handler sementara 
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});


//cek cek apakah api berjalan normal
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

//testing postgres
app.get('/postgres', async(req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM "Users" ', {
            type: QueryTypes.SELECT,
          });
          res.status(200).json({ message: 'Koneksi Sequelize Berhasil', data: result });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "Gagal",
            message: "Koneksi Gagal",
            error: err.message,
        })
        
    }
})

