/*var root = 'http://jsonplaceholder.typicode.com';
var parent = document.getElementById('postContainer');

var x = new XMLHttpRequest();
x.open("GET", root + '/posts', true);
setTimeout(x.onload = function() {
    var data = JSON.parse(x.responseText);
    data.forEach(showContext);
},500)
x.send(null);

function showContext(data) {
    var template = document.getElementById('personTpl').innerHTML;
    var html = document.createElement('div');
    html.className = 'post';
    html.innerHTML = Mustache.to_html(template, data);
    parent.appendChild(html);
}
*/