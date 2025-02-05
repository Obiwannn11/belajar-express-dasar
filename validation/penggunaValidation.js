const { z } = require('zod');

const registrationSchema = z.object({
    fullname: z.string().min(1, { message: 'Fullname harus diisi' }),
    email: z.string().email({ message: 'Email tidak valid, Masukkan Email Yang Valid' }),
    phone: z.string().min(10, { message: 'Nomor telepon minimal 10 digit' }).regex(/^[0-9]+$/, { message: 'Nomor telepon harus berupa angka saja' }),
    password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
    status: z.string().optional(),
});

module.exports = registrationSchema;
