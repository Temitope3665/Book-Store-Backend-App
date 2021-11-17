const Joi = require('joi')

const createUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().required()
    }),
    message: 'Error while creating user'
}

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    message: 'Error while signing in user'
}

const addBookSchema = {
    schema: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
    }),
    message: 'Error while adding book by admin'
}

const updateBookSchema = {
    schema: Joi.object().keys({
        title: Joi.string(),
        author: Joi.string(),
    }),
    message: 'Error while updating book by admin'
}

const addBookToCatalogueSchema = {
    schema: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
    }),
    message: 'Error while updating book by admin'
}

module.exports = {
    createUserSchema,
    loginUserSchema,
    addBookSchema,
    updateBookSchema,
    addBookToCatalogueSchema
}