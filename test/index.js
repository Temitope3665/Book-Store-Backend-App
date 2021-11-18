const {expect} = require('chai')
const request = require('supertest')
const app = require('../src/index')

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoibHlubkBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjM3MjY4MDExLCJleHAiOjE2MzcyNzUyMTF9.Hzu4Sk4WeTB-7xaxEl4JZITxV6yxXKnrSObdVBIb3tc`

let bookId = ''

describe('book', () => {
    it('baseroute', (done) => {
        request(app)
        .get('/')
        .expect(201)
        .end((err, res) => {
            expect(res.body.message).to.equal('Welcome to my book store app')
            expect(res.body.code).to.equal(200)
            done()
        })
    })

    // it('registerUser', (done) => {
    //     request(app)
    //     .post('/register-user')
    //     .send({
    //         firstName: 'Rowland',
    //         lastName: 'Lynn',
    //         role: 'admin',
    //         email: 'lynn@gmail.com',
    //         password: 'password'
    //     })
    //     .expect(201)
    //     .end((err, res) => {
    //         bookId = res.body.data.id
    //         expect(res.body.message).to.equal('User created successfully')
    //         expect(res.body.code).to.equal(201)
    //         expect(res.body.status).to.equal('success')
    //         expect(res.body.data).to.be.an('object')
    //         expect(res.body.data).to.have.property('id')
    //         expect(res.body.data).to.have.property('email')
    //         expect(res.body.data).to.have.property('firstname')
    //         expect(res.body.data).to.have.property('lastname')
    //         expect(res.body.data).to.have.property('role')
    //         done()
    //     })
    // })

    it('loginUser', (done) => {
        request(app)
        .post('/login-user')
        .send({
            email: 'lynn@gmail.com',
            password: 'password'
        })
        .expect(201)
        .end((err, res) => {
            console.log(res.body)
            expect(res.body.message).to.equal('User logged in successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('token')
            done()
        })
    })

    it('addBook', (done) => {
        request(app)
        .post('/add-book')
        .set('x-access-token', token)
        .send({
            title: 'The Devils Gate',
            author: 'Horrors',
        })
        .expect(201)
        .end((err, res) => {
            //console.log(res.body.book_details_id)
            bookId = res.body.data.book_details_id
            expect(res.body.message).to.equal('Books has been added successfully by the admin')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            done()
        })
    })

    it('updateBook', (done) => {
        request(app)
        .put(`/update-book/${bookId}`)
        .set('x-access-token', token)
        .expect(201)
        .end((err, res) => {
            console.log(res.body)
            expect(res.body.message).to.equal('Books has been updated successfully by the admin')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('array')
            expect(res.body.data[0]).to.have.property('title')
            expect(res.body.data[0]).to.have.property('author')
            done()
        })
    })

})