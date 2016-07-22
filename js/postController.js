//var viewCommentController = require('./viewCommentController');

//var root = 'http://jsonplaceholder.typicode.com';
//ar url = root + '/posts' + window.location.search,
  var parentPost = document.getElementById('showpost'),
  px = new XMLHttpRequest();

px.open("GET", 'http://jsonplaceholder.typicode.com' + '/posts/' + window.location.search, true);
px.onload = function (){
  var data = JSON.parse(px.responseText);
  showPostContext(parentPost, data[0]);
  //viewCommentController.viewCommentController(data[0].id);
}
px.send(null);

function showPostContext(data){
    var template = document.getElementById('postTpl').innerHTML;
    var html = document.createElement('div');
    html.className='postdata';
    html.innerHTML = Mustache.to_html(template, data);
    parentPost.appendChild(html);
  }