const { createUser, getUser, validatePassword, addBookHere, updateBookByAdmin, getBooksByUser } = require("../services")


const registerUser = async(req, res, next) => {
    try {
        const { body } = req
        const newUserCreate = await createUser(body)
        const { password, ...user } = newUserCreate // we spread user here because we don't want to output it in our data

        res.status(201).json({
            status: 'success',
            message: `User created successfully`,
            data: user
        })
    } catch (error) {
        return next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { user, body: { password }  } = req // from my body, extracting password
        const validated = await validatePassword(user, password)
        if (!validated) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(201).json({
                status: 'success',
                message: 'User logged in successfully',
                data: validated
            })
        }
    } catch (error) {
        return next(error)
    }
}

const addBook = async(req, res, next) => {
    try {
        const { body, id } = req
        const book = await addBookHere(body, id)

        res.status(201).json({
            status: 'success',
            message: `Books has been added successfully by the admin`,
            data: book
        })
    } catch (error) {
        return next(error)
    }
}

const updateBook = async(req, res, next) => {
    try {
        const { body, params: {id}} = req
        const newBook = await updateBookByAdmin(body, id)

        res.status(201).json({
            status: 'success',
            message: `Books has been updated successfully by the admin`,
            data: newBook
        })

    } catch (error) {
        return next(error)
    }
}

const getBooks = async(req, res, next) => {
    try {
        const { id } = req
        const allBooks = await getBooksByUser(id)

        res.status(200).json({
            status: 'success',
            message: 'All books fetched successfully by user',
            data: allBooks
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    addBook,
    updateBook,
    getBooks
}