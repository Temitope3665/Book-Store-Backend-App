const { getUser } = require("../services")
const { validateToken } = require("../utils")


const checkUser = (type) => async(req, res, next) => {
    try {
        const { body: { email } } = req // from body, trying to destructure the email to be the request
        const [ user ] = await getUser(email)

        if (type === 'login') {
            if (!user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid credentials',
                    data: []
                })
            } else {
                req.user = user
                return next()
            }
        }
        if (user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists. Log in',
                data: []
            })
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

// Validating user
const validateUser = (data, type) => async (req, res, next) => {
    try {
        const getType = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        };
        const options = {
        language: { key: '{{key}}'}
        }
        const result = getType[type]
        const isValid = await data.schema.validate(result, options);
        if(!isValid.error) {
            req[type] = isValid.value;
            return next()
        }
        const { message } = isValid.error.details[0];
        return res.status(400).json({
            status: 'fail',
            message: message.replace(/[\"]/gi,""),
            errors: data.message
        })
    } catch (error) {
        next(error)
    }
}

// Verify token
const verifyToken = (type, role) => async(req, res, next) => {
    try {
        let token
        if (type === 'logged-in' && role === 'admin' || role === 'user') {
            token = req.headers['x-access-token']
        } else {
            token = req.query.token
        }

        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
        })

        const tokenValidated = await validateToken(token, type)
        if(tokenValidated.message) {
            return res.status(403).json({
                status: 'fail',
                message: tokenValidated.message
            })
        }        
        const { userRole, email, id } = tokenValidated
        console.log(tokenValidated)

        if (userRole !== 'admin' && role === 'admin') {
            return res.status(403).json({
                status: 'fail',
                message: 'Not authorized to add book. Only admin can.'
            })
        }
        
        const [ user ] = await getUser(email)

        if (!user) {
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        }

        delete user.password;
        req.user = user
        req.id = id
        return next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkUser,
    validateUser,
    verifyToken
}