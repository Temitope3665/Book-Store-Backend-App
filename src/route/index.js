const express = require('express')
const { registerUser, loginUser, addBook } = require('../controller')
const { checkUser, validateUser, verifyToken } = require('../middleware')
const { createUserSchema, loginUserSchema, addBookSchema } = require('../validation')
const router = express.Router()

router.post(
    '/register-user',
    validateUser(createUserSchema, 'body'),
    checkUser('signup'),
    registerUser
)

router.post(
    '/login-user',
    validateUser(loginUserSchema, 'body'),
    checkUser('login'),
    loginUser
)

router.post(
    '/add-book',
    verifyToken('logged-in', 'admin'),
    validateUser(addBookSchema, 'body'),
    addBook
    )

module.exports = router