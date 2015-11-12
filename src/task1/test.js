var QUnit = require('qunitjs');
var API = require('./mock.js');

QUnit.test("API Test", function(assert) {
  var doneAll = assert.async();
  var doneById = assert.async();
  var doneSearch = assert.async();

  API('/api/v1/orders/all').then(function(res) {
    assert.equal(res.length, 4);
    doneAll();
  });

  API('/api/v1/orders/2').then(function(res) {
    var obj = { id: 2, xid: 'DE-0092123', currency: 'EUR', totalValue: 10.5 };
    assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
    doneById();
  });

  API('/api/v1/orders/search?currency=USD').then(function(res) {
    console.log(res);
    assert.equal(res[0].currency, "USD");
    doneSearch();
  });
});
