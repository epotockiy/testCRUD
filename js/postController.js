var viewCommentController = require('./viewCommentController');

var url = root + '/posts' + window.location.search,
  parentPost = document.getElementById('post'),
  px = new XMLHttpRequest();

px.open("GET", url, true);
px.onload = function (){
  var data = JSON.parse(px.responseText);
  appendingContext(parentPost, data[0]);
  viewCommentController.viewCommentController(data[0].id);
}
px.send(null);
