const {expect} = require('chai')
const request = require('supertest')
const app = require('../src/index')

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

    it('registerUser', (done) => {
        request(app)
        .post(`/register-user`)
        .send({
            firstName: 'Lewis',
            lastName: 'Gordon',
            role: 'user',
            email: 'lew@gmail.com',
            password: 'lewis'
        })
        .expect(201)
        .end((err, res) => {
            expect(res.body.message).to.equal('User created successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('email')
            expect(res.body.data).to.have.property('password')
            expect(res.body.data).to.have.property('firstName')
            expect(res.body.data).to.have.property('lastName')
            expect(res.body.data).to.have.property('role')
            done()
        })
    })

    // it('loginUser', (done) => {
    //     request(app)
    //     .post('/login-user')
    //     .send({
    //         email: 'lara@gmail.com',
    //         password: 'lara'
    //     })
    //     .expect(201)
    //     .end((err, res) => {
    //         console.log(res.body)
    //         expect(res.body.message).to.equal('User logged in successfully')
    //         expect(res.body.code).to.equal(201)
    //         expect(res.body.status).to.equal('success')
    //         // expect(res.body.data).to.be.an('object')
    //         // expect(res.body.data).to.have.property('id')
    //         // expect(res.body.data).to.have.property('email')
    //         // expect(res.body.data).to.have.property('password')
    //         done()
    //     })
    // })

})