const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

// encrypt password
const hashPassword = async password => {
    const encryptPassword = await bcrypt.hash(password, 12)
    return encryptPassword
}

// compare password
const comparePassword = async(password, userPassword) => {
    const isValid = await bcrypt.compare(password, userPassword)
    return isValid
}

// Get a token
const generateToken = async user => {
    const token = jwt.sign(
        { id: user.id, email: user.email, userRole: user.role },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' }
        )

        return token
}

// validate token
const validateToken = async (token, type) => {
    try {
        return jwt.verify(token, type === 'logged-in' ? process.env.TOKEN_KEY: process.env.RESET_TOKEN_KEY)
    } catch (error) {
        return error
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    validateToken
}