const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const registrationSchema = require('../validation/penggunaValidation');


class SignupController {
    _model;

    constructor(model) {
        this._model = model
    }

    store = catchAsync(async (req, res, next) => {

        // Validasi input dengan Zod
        const validatedData = registrationSchema.safeParse(req.body);
        if (!validatedData.success) {
            return next(new AppError(validatedData.error.errors[0].message, 400));
        }

         const { fullname, email, phone, password, status } = validatedData.data;

       // Cek apakah email sudah digunakan
        const existingUser = await this._model.findOne({ where: { email } });
        if (existingUser) {
            return next(new AppError('Email sudah terdaftar, Gunakan Email Lain', 400));
        }

        // Enkripsi password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Simpan data ke database
        const newUser = await this._model.create({
            fullname,
            email,
            phone,
            password: hashedPassword,
            status: status || 'belum', // Default "belum" jika tidak diisi
        });

        return res.status(201).json({
            status: true,
            message: 'Akun pengguna berhasil didaftarkan',
            newUser
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