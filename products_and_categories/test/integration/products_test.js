var request = require('supertest')
var db = require('../../config/database')
var app = require('../../app')

var products = db.get('products')

describe('Given a products API ', function() {
    beforeEach(function(done) {
        products.remove({}, function(err) {
            if (err) done(err)
            done()
        })
    })

    after(function(done) {
        products.remove({}, function(err) {
            if (err) done(err)
            done()
        })
    })
    describe('When we access the GET API', function() {
        it('Then it should return a code of 200 ', function(done) {
            request(app).get('/products').expect(200, done)
        })
        it('Then it should get an instance of an array returned', function(done) {
            request(app).get('/products').expect(function(response) {
                expect(response.body).to.be.instanceOf(Array)
            })
            done()
        })
    })
    describe('When we do a GET reqeust to the products API', function() {
        it('Then the returned product object should have an ID and name property', function(done) {
            var prod = {
                name: "TestName",
                price: "TestPrice",
                category: "TestCategory",
                description: "TestDesc"
            }
            products.insert([prod], function(err, categories) {
                request(app).get('/products').expect(function(response) {
                    expect(response.body[0].name).to.equal('TestName')
                    expect(response.body[0].price).to.equal('TestPrice')
                    expect(response.body[0].category).to.equal('TestCategory')
                    expect(response.body[0].description).to.equal('TestDesc')
                    expect(response.body[0]._id).to.exist
                })
                done()
            })
        })
    })
    describe('When a POST request is submitted to the products api', function() {
        it('Then it should respond with a 200 code', function(done) {
            request(app).post('/products').expect(200, done)
        })
        it('Then it should respond with an instance of an Array when passing a {}', function(done) {
            request(app).post('/products').send({}).expect(function(response) {
                expect(response.body).to.be.instanceOf(Array)
            })
            done()
        })
    })
    describe('When a POST request is submitted to the products api with an object', function() {
        it('Then it should respond with an object with a name, price, category, description and an _id', function(done) {
            request(app).post('/products').send({
                name: "TestName",
                price: "TestPrice",
                category: "TestCategory",
                description: "TestDesc"
            }).expect(function(response) {
                expect(response.body._id).to.exist
                expect(response.body.name).to.equal('TestName')
                expect(response.body.price).to.equal('TestPrice')
                expect(response.body.category).to.equal('TestCategory')
                expect(response.body.description).to.equal('TestDesc')
            })
            done()
        })
    })
})
