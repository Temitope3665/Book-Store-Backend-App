const {expect} = require('chai')
const request = require('supertest')
const app = require('../src/index')

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiamltQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzcyMjMwOTEsImV4cCI6MTYzNzIzMDI5MX0.XM1XRMzMXtu4HlpXqt542wvzjo62rVVBa-tiOSJnctE`

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
    //         firstName: 'Jim',
    //         lastName: 'Myke',
    //         role: 'admin',
    //         email: 'jim@gmail.com',
    //         password: 'password'
    //     })
    //     .expect(201)
    //     .end((err, res) => {
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
            email: 'jim@gmail.com',
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
            title: 'The Conjuring',
            author: 'Horrors',
        })
        .expect(201)
        .end((err, res) => {
            console.log(res.body)
            expect(res.body.message).to.equal('Books has been added successfully by the admin')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            // expect(res.body.data).to.be.an('object')
            // expect(res.body.data).to.have.property('token')
            done()
        })
    })

})