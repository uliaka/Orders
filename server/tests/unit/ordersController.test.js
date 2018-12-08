const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

const Order = function () {
  return {
    save: sinon.spy(),
  }
}

const ordersController = require('../../controllers/ordersController')(Order);

describe('testing ordersController', function() {
  describe('#indexOf()', function() {
    const req = {
      query: {
        title: 'some title',
      },
      order: {
        save: sinon.spy(),
      },
    };
    const res = {
      send: sinon.spy(),
      end: sinon.spy(),
    };

    it('testing ordersController.put', function() {
      ordersController.put(req, res);
      const orderSavewasCalled = req.order.save.called;
      expect(orderSavewasCalled).to.equal(true);
    });

    it('testing ordersController.put without title', function() {
      const req = { query: {}, order: { save: sinon.spy() }};
      const res = {
        send: sinon.spy(),
        end: sinon.spy(),
      };
      ordersController.put(req, res);
      const orderSavewasCalled = req.order.save.called;
      expect(orderSavewasCalled).to.equal(false);
    });

  });

    it('testing ordersController.post', function() {
      const req = {
        body: {
          title: 'sososo',
          price: 34,
        }
      };
      const res = {
        send: sinon.spy(),
      };
      ordersController.post(req, res);
      const orderSavewasCalled = res.send.called;
      expect(orderSavewasCalled).to.equal(true);
      expect(res.send.getCall(0).args[0].success).to.equal(true);
    });

    it('testing ordersController.post without title', function() {
      const req = {
        body: {
          price: 34,
        }
      };
      const res = {
        send: sinon.spy(),
      };
      ordersController.post(req, res);
      const orderSavewasCalled = res.send.called;
      expect(orderSavewasCalled).to.equal(true);
      expect(res.send.getCall(0).args[0].success).to.equal(false);
      expect(res.send.getCall(0).args[0].message).to.equal('missing title or price');
    });
});
