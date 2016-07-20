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
    btnEdit.className = 'btn btn-primary';
    window.boolEdit = 1;
    btnEdit.onclick = editComment.editComment;

    var btnDelete = document.createElement('a');
    btnDelete.innerHTML = 'delete';
    btnDelete.className = 'btn btn-primary';
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