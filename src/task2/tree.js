var testData = require('./t2.js');
var data = {}, result;

var indexData = function() {
  for (var i = 0; i < testData.length; i++) {
    data[testData[i].id] = testData[i];
    data[testData[i].id].childs = [];
  }
}

var updateChilds = function() {
  for (var item in data) {
    if (data.hasOwnProperty(item) && data[item].parent) {
      var parentId = data[item].parent;
      data[parentId].childs.push(data[item]);
    }
  }
}

var cleanData = function() {
  for (var item in data) {
    if (data.hasOwnProperty(item) && !data[item].parent) {
      result = data[item];
    }
  }
}

indexData();
updateChilds();
cleanData();


var jsonfile = require('jsonfile')
var file = 'data.json'

jsonfile.writeFile(file, result, function (err) {
  console.error(err)
})
