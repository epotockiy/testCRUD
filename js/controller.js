
  var root = 'http://jsonplaceholder.typicode.com',
    parent = document.getElementById('posts-container');

  var x = new XMLHttpRequest();
  x.open("GET", root + '/posts', true);
  x.onload = function (){
    var data = JSON.parse(x.responseText);
    data.forEach(showContext);
  }
  x.send(null);

  function showContext(element, index, array) {
    var post = array[index];
    if(post && parent){
      appendingContext(parent, post);
    }
  }

  function appendingContext(_parent, _post) {
    var h2 = document.createElement('h2');
    h2.innerHTML = '<a href="#">' + _post.title + '</a>';
    _parent.appendChild(h2);

    var author = document.createElement('p');
    author.className = 'lead';
    author.innerHTML = 'by author id' + _post.userId;
    _parent.appendChild(author);

    var time =  document.createElement('p');
    time.innerHTML = '<span class="glyphicon glyphicon-time"></span>' + 'Posted on August 28, 2013 at 10:00 PM';
    _parent.appendChild(time);
    _parent.appendChild(document.createElement('hr'));

    var text = document.createElement('p');
    text.innerHTML = _post.body;
    _parent.appendChild(text);

    if(_parent.getAttribute('id') === 'posts-container') {
      var btn = document.createElement('a');
      btn.className = 'btn btn-primary';
      btn.setAttribute('href', './post.html'+'?id=' + _post.id);
      btn.innerHTML = 'Read More' + '<span class="glyphicon glyphicon-chevron-right"></span>';
      _parent.appendChild(btn);
    }
    
    _parent.appendChild(document.createElement('hr'));

  }