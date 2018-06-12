var expect  = require('chai').expect;
var request = require('request');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const PORT = process.env.SERVER_PORT || 8000;

it('API REST Characters', function(done) {
    url = 'http://localhost:' + PORT + '/api/v1.0/characters';
    console.log(url);
    request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('API REST Character for Id', function(done) {
    url = 'http://localhost:' + PORT + '/api/v1.0/character/26';
    console.log(url);
    request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('API REST Character not found', function(done) {
    url = 'http://localhost:' + PORT + '/api/v1.0/character';
    console.log(url);
    request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});