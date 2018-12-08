const request = require('supertest');
const assert = require('assert');
const app = require('../../../server.js');
const config = require('../../config');

describe('GET /orders', function() {
  it('responds with json', function() {
    return request(app)
      .get('/orders')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {

      });
  });
});
