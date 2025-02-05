const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });
const jwt = require('jsonwebtoken')

const generateToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports = { generateRefreshToken, generateToken, verifyToken }