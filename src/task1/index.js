var Model = require('./model.js');

var Order = new Model('orders');
Order.all();
Order.get(2);
Order.query({field: 'currency', op: 'eq', val: 'USD'});
Order.query([
  {field: 'currency', op: 'eq', val: 'EUR'},
  {field: 'totalValue', op: 'lt', val: 10},
])


var Consumer = new Model('consumers');
Consumer.all();
Consumer.get(11);
Consumer.query({field: 'lastName', op: 'like', val: 'cleese'});
