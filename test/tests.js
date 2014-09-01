var request = require('request');
var chai = require('chai');
var expect = chai.expect;

var Url = function(path) {
    path = path || '';
    return 'http://localhost:3000' + path;
};

describe('server', function() {
    it('#should be working', function(done) {
        request.get({
            url: Url('/status')
        }, function(err, res, body) {
            expect(res.statusCode).to.equal(200);
            expect(body).to.equal('Working!');
            done();
        })
    });
});

describe('routes', function() {
    var url = Url('/db');
    describe('#get all', function() {
        it('should have Result array', function(done) {
            request.get({
                url: url,
                json: true
            }, function(err, res, body) {
                expect(body).to.have.property('Result');
                expect(body.Result).to.be.an('Array');
                done();
            })
        });
    })
})
