var root = 'http://jsonplaceholder.typicode.com';

var x = new XMLHttpRequest();
x.open("GET", root + '/posts', true);
x.onload = function (){
  var data = JSON.parse(x.responseText);
  // alert(x.responseText);
  data.forEach(showContext);

  // var a = getElementsByTagName('a');
  // a.on('click', function(e) {
  //   e.preventdefault();
  // })

}
x.send(null);


function showContext(element, index, array) {
  var post = array[index],
      parent = document.getElementById('posts-container');

  var h2 = document.createElement('h2');
  h2.innerHTML = '<a href="#">' + post.title + '</a>';
  parent.appendChild(h2);

  var author = document.createElement('p');
  author.className = 'lead';
  author.innerHTML = 'by author id' + post.id;
  parent.appendChild(author);

  var time =  document.createElement('p');
  time.innerHTML = '<span class="glyphicon glyphicon-time"></span>' + 'Posted on August 28, 2013 at 10:00 PM';
  parent.appendChild(time);
  parent.appendChild(document.createElement('hr'));

  var text = document.createElement('p');
  text.innerHTML = post.body;

  var btn = document.createElement('a');
  btn.className = 'btn btn-primary';
  btn.setAttribute('href', './post.html');
  btn.innerHTML = 'Read More' + '<span class="glyphicon glyphicon-chevron-right"></span>';

  parent.appendChild(text);
  parent.appendChild(btn);
  parent.appendChild(document.createElement('hr'));
}
