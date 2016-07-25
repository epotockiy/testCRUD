 exports.saveComment = function() {
 	
 	var submit = document.getElementById('submit'),
    authorName = document.getElementById('authorName'),
    email = document.getElementById('email'),
    textComment = document.getElementById('textComment');

    var _this = this;
    var div = _this.closest('.media').firstChild;
    var p = document.createElement('p');
    p.innerHTML = div.lastChild.value;
    div.removeChild(div.lastChild);
    div.appendChild(p);
    _this.closest('.media').childNodes[1].removeChild(_this);
    window.boolEdit = 1;
  }