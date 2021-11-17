const db = require('../db')
const queries = require('../db/queries')
const { hashPassword, comparePassword, generateToken } = require('../utils')

// create user
const createUser = async(body) => {
    const { firstName, lastName, role, email, password } = body
    const encryptedPassword = await hashPassword(password)
    const payload = [firstName, lastName, role, email, encryptedPassword]
    return db.one(queries.addNewUser, payload)
}

// add book
const addBookHere = async(body, id) => {
    const { title, author } = body
    const payload = [ id, title, author ]
    return db.one(queries.addNewBook, payload)
}

// updateBook
const updateBookByAdmin = async(data, id) => {
    // const { title, author } = body
    const payload = [ data.title, data.author, id ]
    return db.any(queries.updateBook, payload)
}

// get user
const getUser = email => db.any(queries.getUser, email)

// get all books
const getBooksByUser = async(id) => db.many(queries.getAllBooks, id)

// Validate password
const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)
    if (isValid) {
        const token = await generateToken(user)
        return { token }
    }
    return false
}

module.exports = {
    createUser,
    getUser,
    validatePassword,
    addBookHere,
    updateBookByAdmin,
    getBooksByUser
}