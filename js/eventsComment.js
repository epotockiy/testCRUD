var submit = document.getElementById('submit'),
  authorName = document.getElementById('authorName'),
  email = document.getElementById('email'),
  textComment = document.getElementById('textComment');

submit.onclick = function() {
  if (authorName.value && email.value && textComment.value) {
    var newComment = {
      name: authorName.value,
      email: email.value,
      body: textComment.value
    };
    appendingComment(newComment);
    authorName.value = null;
    email.value = null;
    textComment.value = null;
  }else alert('please, fill data');
};

var deleteComment = function () {
  parentComment.removeChild(this.closest('.media'));
}

var editComment = function () {
  _this = this;
  var div = _this.closest('.media').firstChild;
  var p = div.lastChild;
  var text = p.innerHTML;
  var input = document.createElement('textarea');
  input.value = text;
  input.className = 'form-control';
  input.setAttribute('rows', 5);
  div.removeChild(p);
  div.appendChild(input);

  var btnSave = document.createElement('a');
  btnSave.innerHTML = 'save';
  btnSave.className = 'btn btn-primary';
  btnSave.onclick = saveComment;

  _this.closest('.media').childNodes[1].appendChild(btnSave);

}

var saveComment = function() {
  var _this = this;
  var div = _this.closest('.media').firstChild;
  var p = document.createElement('p');
  p.innerHTML = div.lastChild.value;
  div.removeChild(div.lastChild);
  div.appendChild(p);
  _this.closest('.media').childNodes[1].removeChild(_this);
}
