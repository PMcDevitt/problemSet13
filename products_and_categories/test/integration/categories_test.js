var request = require('supertest')
var db = require('../../config/database')
var app = require('../../app')

var categories = db.get('categories')

describe('Given the Categories API', function() {
    beforeEach(function(done) {
        categories.remove({}, function(err) {
            if (err) done(err)
            done()
        })
    })

    after(function(done) {
        categories.remove({}, function(err) {
            if (err) done(err)
            done()
        })
    })
    describe('When we request the categories page', function() {
        it('Then we should get a 200 ', function(done) {
            request(app).get('/categories')
                .expect(200, done)
        })
    })
    describe('When we request the categories page', function() {
        it('Then we should get an instance of an array ', function(done) {
            request(app).get('/categories').expect(function(response) {
                expect(response.body).to.be.instanceOf(Array)
            })
            done()
        })
    })
    describe('When we request the categories page', function() {
        it('Then we should get more than one category returned in the array ', function(done) {
            var category1 = {
                name: "category1"
            }
            var category2 = {
                name: "category2"
            }
            categories.insert([category1, category2], function(err, categories) {
                request(app).get('/categories').expect(function(response) {
                    expect(response.body.length).to.be.above(1)
                })
                done()
            })
        })
    })
    describe('When we do a GET reqeust on the categories page it should return a category object', function() {
        it('Then the category should have an ID and name property', function(done) {
            var category1 = {
                name: "category1"
            }
            categories.insert([category1], function(err, categories) {
                request(app).get('/categories').expect(function(response) {
                    expect(response.body[0].name).to.equal('category1')
                    expect(response.body[0]._id).to.exist
                })
                done()
            })
        })
    })
    describe('When we submit a POST request to the categories api', function(done) {
        it('Then ist should respond with a 200 code', function(done) {
            request(app).post('/categories').expect(200, done)
        })
    })
    describe('When we submit a POST request to the categories api', function(done) {
        it('Then it should respond with a Object with an _id and a name', function(done) {
            request(app).post('/categories').send({
                    name: "category1"
                })
                .expect(function(response) {
                    expect(response.body._id).to.exist
                    expect(response.body.name).to.equal('category1')
                })
            done()
        })
    })
})
