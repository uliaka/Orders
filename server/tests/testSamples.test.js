const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('example of chai', function() {
  describe('1 should equal 1', function() {
    it('shoul return true if 1 == 1', function() {
      const foo = "bar";
      const tea = {
        flavors: 'dsf',
      };
      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.lengthOf(3);
      expect(tea).to.have.property('flavors').with.lengthOf(3);
    })
  });
});


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

