const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const registrationSchema = require('../validation/penggunaValidation');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const env = dotenv.config();

// import model Penggunas untuk ubah secara langsung 
const { Pengguna } = require('../database/models');



class otpController {
    _model;

    constructor(model) {
        this._model = model
    }

    verifyOtp = catchAsync(async (req, res, next) => {
        const { token } = req.query;
        console.log(token)
        // console.log("Model OTP: ", this._model); // Debugging

        if (!token) {
            return next(new AppError('Token verifikasi tidak Ada', 400));
        }

        // 1. Temukan OTP berdasarkan token
        const otpRecord = await this._model.findOne({ where: { otp: token } });

        // 2. Jika OTP tidak ditemukan, kirimkan error
        if (!otpRecord) {
        return next(new AppError('Token OTP tidak valid atau telah kedaluwarsa.', 400));
        }

        // 3. Ambil user_id dari entri OTP
        const userId = otpRecord.user_id;

        // 4. Cek apakah OTP masih berlaku
        if (new Date() > otpRecord.otp_expiry) {
            return res.status(400).json({ message: 'OTP sudah kadaluarsa' });
        }

        // 5. Temukan pengguna berdasarkan user_id
        const user = await Pengguna.findOne({ where: { id: userId } }); // Pastikan Anda mengimpor model Penggunas

        // 6. Jika pengguna tidak ditemukan, kirimkan error
        if (!user) {
            return next(new AppError('Pengguna tidak ditemukan.', 404));
        }

        // 7. Ubah status menjadi "sudah"
        user.status = 'sudah';
        await user.save();

        // 8. Hapus OTP setelah verifikasi berhasil
        await otpRecord.destroy();
        console.log(`Menghapus baris (60)`)

        return res.status(200).json({
            status: true,
            message: 'Verifikasi email berhasil, Anda dapat login sekarang',
        });
    });

    

}

module.exports = otpController;