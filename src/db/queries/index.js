const queries = {
    addNewUser: `
        INSERT INTO users (
            firstName,
            lastName,
            role,
            email,
            password
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
    getUser: `
        SELECT * FROM users
        WHERE email=$1
    `,
    getRole: `
        SELECT * FROM users
        WHERE role=$1
    `,
    addNewBook: `
        INSERT INTO books (
            user_id,
            title,
            author
        ) VALUES ($1, $2, $3)
        RETURNING *
    `
}

module.exports = queries