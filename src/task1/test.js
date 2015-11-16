var QUnit = require('qunitjs');
var API = require('./mock.js');

var Model = require('./model.js');

var Order = new Model('orders');
var Consumer = new Model('consumers');

QUnit.test("All orders", function(assert) {
  done = assert.async();
  Order.all().then(function(res) {
    assert.deepEqual(res, [
      {id: 1, xid: 'US-0092194', currency: 'USD', totalValue: 100.23},
      {id: 2, xid: 'DE-0092123', currency: 'EUR', totalValue: 10.50},
      {id: 3, xid: 'DE-0091077', currency: 'EUR', totalValue: 9.99},
      {id: 4, xid: 'US-0020204', currency: 'USD', totalValue: 72.00},
    ]);
    done();
  });
});

QUnit.test("One order", function(assert) {
  done = assert.async();
  Order.get(2).then(function(res) {
    assert.deepEqual(res, {id: 2, xid: 'DE-0092123', currency: 'EUR', totalValue: 10.50});
    done();
  });
});

QUnit.test("Order query with one filter", function(assert) {
  done = assert.async();
  Order.query({field: 'currency', op: 'eq', val: 'USD'}).then(function(res) {
    assert.deepEqual(res, [
      {id: 1, xid: 'US-0092194', currency: 'USD', totalValue: 100.23},
      {id: 4, xid: 'US-0020204', currency: 'USD', totalValue: 72.00},
    ]);
    done();
  });
});

QUnit.test("Order query with combined filters", function(assert) {
  done = assert.async();
  Order.query([
    {field: 'currency', op: 'eq', val: 'EUR'},
    {field: 'totalValue', op: 'lt', val: 10},
  ]).then(function(res) {
    assert.deepEqual(res, [{id: 3, xid: 'DE-0091077', currency: 'EUR', totalValue: 9.99}]);
    done();
  });
});

QUnit.test("All consumers", function(assert) {
  done = assert.async();
  Consumer.all().then(function(res) {
    assert.deepEqual(res, [
      {id: 10, firstName: 'John', lastName: 'Cleese'},
      {id: 11, firstName: 'Eric', lastName: 'Idle'},
    ]);
    done();
  });
});

QUnit.test("One consumer", function(assert) {
  done = assert.async();
  Consumer.get(11).then(function(res) {
    assert.deepEqual(res, {id: 11, firstName: 'Eric', lastName: 'Idle'});
    done();
  });
});

QUnit.test("Consumer query with one filter", function(assert) {
  done = assert.async();
  Consumer.query({field: 'lastName', op: 'like', val: 'cleese'}).then(function(res) {
    assert.deepEqual(res, [{id: 10, firstName: 'John', lastName: 'Cleese'}]);
    done();
  });
});

