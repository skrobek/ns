var API = require('./mock.js');

var CONFIG = {
  host: '/api',
  version: 'v1'
}


var QueryParser = {
  parse: function(params) {
    var url = '';

    if (Array.isArray(params) && params.length > 0) {
      for (var i = 0; i < params.length; i++) {
        url += this.parseQuery(params[i]);

        if (i < params.length - 1) {
          url += '&';
        }
      }
    } else {
      url += this.parseQuery(params);
    }

    return url;
  },

  parseQuery: function(item) {
    var queryPart = item.field + '=';

    if (['lt', 'gt'].indexOf(item.op) > -1) {
      queryPart += item.op + '.' + item.val;
    } else {
      queryPart += item.val;
    }

    return queryPart;
  }
};



var Model = function(path) {
  var path = CONFIG.host + '/' + CONFIG.version + '/' + path + '/';

  var callback = function(value) {
    console.log(value);
  };


  this.all = function() {
    var url = path + 'all';
    API(url, "GET").done(callback);
  };

  this.get = function(id) {
    var url = path + id;
    API(url, "GET").done(callback);
  };

  this.query = function(params) {
    var url = path + 'search?';
    url += QueryParser.parse(params);
    API(url, "GET").done(callback);
  };

  return this;
}

module.exports = Model;
