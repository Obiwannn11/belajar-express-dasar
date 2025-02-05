const { z } = require('zod');

const loginSchema = z.object({
    email: z.string().email({ message: 'Masukkan Email Yang Valid' }),
    password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
});

module.exports = loginSchema;
