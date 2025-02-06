const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const registrationSchema = require('../validation/penggunaValidation');
const nodemailer = require('nodemailer');
const { generateToken, verifyToken } = require('../utils/jwt');
const dotenv = require('dotenv');
const env = dotenv.config();


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
            status: 'belum', // Default "belum" jika tidak diisi
        });

        // Buat token verifikasi email
        // Buat OTP 6 digit
        const otpCode = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

        // Simpan OTP ke database
        await OTP.create({
            user_id: newUser.id,
            otp: otpCode,
            otp_expiry: otpExpiry
        });

        // Kirim email dengan Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS, // Email pengirim
                pass: process.env.EMAIL_PASSWORD, // Password email pengirim
            },
        });


        const verificationLink = `${process.env.FRONTEND_URL}/register/verify-email?token=${otpCode}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Verifikasi Akun Anda',
            html: `<p>Silakan klik link di bawah ini untuk verifikasi akun Anda:</p>
                   <a href="${verificationLink}">Klik disini</a>
                   <br>
                   atau Copy Link ini ${verificationLink}  
                   <br>
                   `,
        });


        return res.status(201).json({
            status: true,
            message: 'Akun pengguna berhasil didaftarkan, silahkan cek email untuk verifikasi',
            newUser
        });
    });

    verifyEmail = catchAsync(async (req, res, next) => {
        const { token } = req.query;
        console.log(token)

        if (!token) {
            return next(new AppError('Token verifikasi tidak valid', 400));
        }

        const decoded = await verifyToken(token);

        // Cari user berdasarkan ID dari token
        const user = await this._model.findByPk(decoded.id);
        if (!user) {
            return next(new AppError('Pengguna tidak ditemukan', 404));
        }

        // Ubah status menjadi "sudah"
        user.status = 'sudah';
        await user.save();

        return res.status(200).json({
            status: true,
            message: 'Verifikasi email berhasil, Anda dapat login sekarang',
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