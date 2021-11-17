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
    `,
    updateBook: `
        UPDATE books
        SET
            title = $1,
            author = $2
        WHERE book_details_id=$3
        RETURNING *
    `,
    getAllBooks: `
    SELECT * FROM books
    `,
    addNewBookToUserCatalogue: `
    INSERT INTO userbooks (
        user_book_id,
        title,
        author
    ) VALUES ($1, $2, $3)
    RETURNING *
    `,
    getBookFromCatalogue: `
        SELECT * FROM userbooks
    `,
    deleteCatalogueBooks: `
    DELETE FROM userbooks
    WHERE id = $1
    `,
    getBooksById: ` 
        SELECT * FROM books
        WHERE book_details_id=$1
    `
}

module.exports = queries