const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class SignupController {
    _model;

    constructor(model) {
        this._model = model
    }

    store = catchAsync(async (req, res, next) => {
        const { fullname, email, password } = req.body;

        // Validasi input
        if (!fullname || !email || !password) {
            return next(new AppError('Semua kolom (name, email, password) wajib diisi', 400));
        }

        // Cek apakah email sudah digunakan
        const existingUser = await this._model.findOne({ where: { email } });
        if (existingUser) {
            return next(new AppError('Email sudah terdaftar, gunakan email lain', 400));
        }

        // Simpan data
        const data = await this._model.create(req.body);
        if (!data) {
            return next(new AppError('Gagal mendaftar akun pengguna', 500));
        }

        return res.status(201).json({
            status: true,
            message: 'Akun pengguna berhasil didaftarkan',
            data
        });
    });

    
    index = async (req, res) => {
        try {
            const data = await this._model.findAll();
            return res.json({
                status: true,
                message: "Data Ditemukan semua",
                total: data.length,
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Data Tidak Ditemukan",
                err: error.message
            })
            
        }
    }

}

module.exports = SignupController;