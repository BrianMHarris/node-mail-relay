// supertest for http requests
const request = require('supertest');
const app = require('../app');

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('GET / (root)', function() {
  it('redirects to the /error route', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.redirect;
        expect(res.status).to.equal(200);
        done();
      })
  });
});

describe('GET /contact', function() {
  it('redirects to the /error route', function(done) {
    chai.request(app)
      .get('/contact')
      .end(function(err, res) {
        expect(res).to.redirect;
        expect(res.status).to.equal(200);
        done();
      })
  });
});

// describe('POST /contact', function() {
//   it('fails without proper input', function(done) {
//     request(app)
//       .post('/contact')
//       .expect(200, done);
//   });
// });
