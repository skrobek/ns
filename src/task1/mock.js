// Mock HTTP implementation - do not modify this part.
var Q = require('q');

var mock = function http(url, method, data) {
  var orders = [
    {id: 1, xid: 'US-0092194', currency: 'USD', totalValue: 100.23},
    {id: 2, xid: 'DE-0092123', currency: 'EUR', totalValue: 10.50},
    {id: 3, xid: 'DE-0091077', currency: 'EUR', totalValue: 9.99},
    {id: 4, xid: 'US-0020204', currency: 'USD', totalValue: 72.00},
  ];

  var consumers = [
    {id: 10, firstName: 'John', lastName: 'Cleese'},
    {id: 11, firstName: 'Eric', lastName: 'Idle'},
  ];

  var responses = {
    '/api/v1/orders/all': orders,
    '/api/v1/orders/2': orders[1],
    '/api/v1/orders/search?currency=USD': [orders[0], orders[3]],
    '/api/v1/orders/search?currency=EUR&totalValue=lt.10': [orders[2]],
    '/api/v1/consumers/list': consumers,
    '/api/v1/consumers/11': consumers[1],
    '/api/v1/consumers/search?lastName=cleese': consumers[0],
  };

  var res = Q.defer();
  setTimeout(function() {
    res.resolve(responses[url]);
  }, 4);
  return res.promise;
}

module.exports = mock;
