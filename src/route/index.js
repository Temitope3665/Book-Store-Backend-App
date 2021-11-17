const express = require('express')
const { registerUser, loginUser, addBook, updateBook, getBooks, addBookToCatalogue, getCatalogueBooks, deleteCatalogueBook } = require('../controller')
const { getAllBooks } = require('../db/queries')
const { checkUser, validateUser, verifyToken, verifyBookId } = require('../middleware')
const { createUserSchema, loginUserSchema, addBookSchema, updateBookSchema, addBookToCatalogueSchema } = require('../validation')
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

router.put(
    '/update-book/:id',
    verifyToken('logged-in', 'admin'),
    validateUser(updateBookSchema, 'body'),
    verifyBookId,
    updateBook
)

router.get(
    '/get-all-books',
    verifyToken('logged-in', 'user'),
    getBooks
)

router.post(
    `/add-books-to-catalogue`,
    verifyToken('logged-in', 'user'),
    validateUser(addBookToCatalogueSchema, 'body'),
    addBookToCatalogue
)

router.get(
    '/get-catalogue-books',
    verifyToken('logged-in', 'user'),
    getCatalogueBooks
)

router.delete(
    '/delete-catalogue-books/:id',
    verifyToken('logged-in', 'user'),
    deleteCatalogueBook
)
module.exports = router