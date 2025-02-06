const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const loginSchema = require('../validation/loginValidation');
const { generateToken, verifyToken } = require('../utils/jwt');


class LoginController {
    constructor(model) {
        this._model = model;
    }

    login = catchAsync(async (req, res, next) => {
        // Validasi input dengan Zod
        const validatedData = loginSchema.safeParse(req.body);
        if (!validatedData.success) {
            return next(new AppError(validatedData.error.errors[0].message, 400));
        }

        const { email, password } = validatedData.data;

        // Cek apakah email ada di database
        const user = await this._model.findOne({ where: { email } });
        if (!user) {
            return next(new AppError('Email tidak terdaftar', 400));
        }

        // Periksa apakah pengguna sudah verifikasi
        if (user.status !== 'sudah') {
            return next(new AppError('Silakan verifikasi email sebelum login', 400));
        }

        // Periksa kecocokan password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(new AppError('Password salah', 400));
        }

        // Buat token JWT untuk sesi login
        const token = generateToken({ id: user.id });


        return res.status(200).json({
            status: true,
            message: 'Login berhasil',
            data: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                status: user.status,
            },
        });
    });
}

module.exports = LoginController;
