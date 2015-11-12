var traversal = function(node) {
  var item = document.createElement("div");
  var t = document.createTextNode(node.name);
  item.appendChild(t);

  if (node.children && node.children.length > 0) {
    var list = document.createElement("ul");

    for (var i = 0; i < node.children.length; i++) {
      var li = document.createElement("li");
      var name = document.createTextNode(node.children[i].name);
      li.appendChild(name);
      list.appendChild(traversal(node.children[i]));
    }

    item.appendChild(list);
  }

  return item;
}

var tree = traversal(TEST_DATA);
document.body.appendChild(tree);
