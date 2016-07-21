(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.deleteComment = function () {
    parentComment.removeChild(this.closest('.media'));
}
},{}],2:[function(require,module,exports){
  var saveComment = require('./saveComment'); 
  exports.editComment = function() {
    if(boolEdit){
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
        btnSave.className = 'btn btn-success';
        boolEdit = 0;
        btnSave.onclick = saveComment.saveComment;

        _this.closest('.media').childNodes[1].appendChild(btnSave);
    }

  }
},{"./saveComment":5}],3:[function(require,module,exports){
exports.eventsComment = function(){

  window.submit = document.getElementById('submit'),
    authorName = document.getElementById('authorName'),
    email = document.getElementById('email'),
    textComment = document.getElementById('textComment'); 
}

},{}],4:[function(require,module,exports){
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

},{"./viewCommentController":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var eventsComment = require('./eventsComment');
var saveComment = require('./saveComment');
var editComment = require('./editComment');

var deleteComment = require('./deleteComment');

exports.viewCommentController = function(currentId){
    // eventsComment.eventsComment();
    commentsView(currentId); 
    function commentsView(_id){
    var cx = new XMLHttpRequest();
    cx.open("GET",  root + '/posts/' + _id + '/comments', true);
    cx.onload = function (){
      var comments = JSON.parse(cx.responseText);
      comments.forEach(showComments);
    }
    cx.send(null);
    }

  window.parentComment = document.getElementById('comment-context');

  function showComments(element, index, array) {
    var comment = array[index];
    if(comment && parentComment){
      appendingComment(comment);
    }
  }

  function appendingComment(_comment) {
    var commentBox = document.createElement('div');
    commentBox.className = 'media';
    parentComment.appendChild(commentBox);

    var commentBody = document.createElement('div');
    commentBody.className = 'media-body';

    var author = document.createElement('h4');
    author.innerHTML = _comment.name ;
    author.className = 'media-heading';

    var email = document.createElement('small');
    email.innerHTML = 'by ' + _comment.email;

    var body = document.createElement('p');
    body.innerHTML = _comment.body;

    commentBody.appendChild(author);
    commentBody.appendChild(email);
    commentBody.appendChild(body);

    commentBox.appendChild(commentBody);

    var btnEdit = document.createElement('a');
    btnEdit.innerHTML = 'edit';
    btnEdit.className = 'btn btn-info';
    window.boolEdit = 1;
    btnEdit.onclick = editComment.editComment;

    var btnDelete = document.createElement('a');
    btnDelete.innerHTML = 'delete';
    btnDelete.className = 'btn btn-danger';
    btnDelete.onclick = deleteComment.deleteComment;

    var btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.appendChild(btnEdit);
    btnGroup.appendChild(btnDelete);

    commentBox.appendChild(btnGroup);
    commentBox.appendChild(document.createElement('hr'));
  }
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
}
},{"./deleteComment":1,"./editComment":2,"./eventsComment":3,"./saveComment":5}]},{},[4]);
