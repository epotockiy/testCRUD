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
        btnSave.className = 'btn btn-primary';
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
},{"./deleteComment":1,"./editComment":2,"./eventsComment":3,"./saveComment":5}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL3VzZXIvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZGVsZXRlQ29tbWVudC5qcyIsImVkaXRDb21tZW50LmpzIiwiZXZlbnRzQ29tbWVudC5qcyIsInBvc3RDb250cm9sbGVyLmpzIiwic2F2ZUNvbW1lbnQuanMiLCJ2aWV3Q29tbWVudENvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnRzLmRlbGV0ZUNvbW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBwYXJlbnRDb21tZW50LnJlbW92ZUNoaWxkKHRoaXMuY2xvc2VzdCgnLm1lZGlhJykpO1xyXG59IiwiICB2YXIgc2F2ZUNvbW1lbnQgPSByZXF1aXJlKCcuL3NhdmVDb21tZW50Jyk7IFxyXG4gIGV4cG9ydHMuZWRpdENvbW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmKGJvb2xFZGl0KXtcclxuICAgIF90aGlzID0gdGhpcztcclxuICAgIHZhciBkaXYgPSBfdGhpcy5jbG9zZXN0KCcubWVkaWEnKS5maXJzdENoaWxkO1xyXG4gICAgdmFyIHAgPSBkaXYubGFzdENoaWxkO1xyXG4gICAgdmFyIHRleHQgPSBwLmlubmVySFRNTDtcclxuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICBpbnB1dC52YWx1ZSA9IHRleHQ7XHJcbiAgICBpbnB1dC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sJztcclxuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncm93cycsIDUpO1xyXG4gICAgZGl2LnJlbW92ZUNoaWxkKHApO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgdmFyIGJ0blNhdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgYnRuU2F2ZS5pbm5lckhUTUwgPSAnc2F2ZSc7XHJcbiAgICAgICAgYnRuU2F2ZS5jbGFzc05hbWUgPSAnYnRuIGJ0bi1wcmltYXJ5JztcclxuICAgICAgICBib29sRWRpdCA9IDA7XHJcbiAgICAgICAgYnRuU2F2ZS5vbmNsaWNrID0gc2F2ZUNvbW1lbnQuc2F2ZUNvbW1lbnQ7XHJcblxyXG4gICAgICAgIF90aGlzLmNsb3Nlc3QoJy5tZWRpYScpLmNoaWxkTm9kZXNbMV0uYXBwZW5kQ2hpbGQoYnRuU2F2ZSk7XHJcbiAgICB9XHJcblxyXG4gIH0iLCJleHBvcnRzLmV2ZW50c0NvbW1lbnQgPSBmdW5jdGlvbigpe1xyXG5cclxuICB3aW5kb3cuc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLFxyXG4gICAgYXV0aG9yTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRob3JOYW1lJyksXHJcbiAgICBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbCcpLFxyXG4gICAgdGV4dENvbW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dENvbW1lbnQnKTsgXHJcbn1cclxuIiwidmFyIHZpZXdDb21tZW50Q29udHJvbGxlciA9IHJlcXVpcmUoJy4vdmlld0NvbW1lbnRDb250cm9sbGVyJyk7XHJcblxyXG52YXIgdXJsID0gcm9vdCArICcvcG9zdHMnICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCxcclxuICBwYXJlbnRQb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QnKSxcclxuICBweCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxucHgub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xyXG5weC5vbmxvYWQgPSBmdW5jdGlvbiAoKXtcclxuICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocHgucmVzcG9uc2VUZXh0KTtcclxuICBhcHBlbmRpbmdDb250ZXh0KHBhcmVudFBvc3QsIGRhdGFbMF0pO1xyXG4gIHZpZXdDb21tZW50Q29udHJvbGxlci52aWV3Q29tbWVudENvbnRyb2xsZXIoZGF0YVswXS5pZCk7XHJcbn1cclxucHguc2VuZChudWxsKTtcclxuIiwiIGV4cG9ydHMuc2F2ZUNvbW1lbnQgPSBmdW5jdGlvbigpIHtcclxuIFx0XHJcbiBcdHZhciBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JyksXHJcbiAgICBhdXRob3JOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhvck5hbWUnKSxcclxuICAgIGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyksXHJcbiAgICB0ZXh0Q29tbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Q29tbWVudCcpO1xyXG5cclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICB2YXIgZGl2ID0gX3RoaXMuY2xvc2VzdCgnLm1lZGlhJykuZmlyc3RDaGlsZDtcclxuICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgcC5pbm5lckhUTUwgPSBkaXYubGFzdENoaWxkLnZhbHVlO1xyXG4gICAgZGl2LnJlbW92ZUNoaWxkKGRpdi5sYXN0Q2hpbGQpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHApO1xyXG4gICAgX3RoaXMuY2xvc2VzdCgnLm1lZGlhJykuY2hpbGROb2Rlc1sxXS5yZW1vdmVDaGlsZChfdGhpcyk7XHJcbiAgICB3aW5kb3cuYm9vbEVkaXQgPSAxO1xyXG4gIH0iLCJcclxudmFyIGV2ZW50c0NvbW1lbnQgPSByZXF1aXJlKCcuL2V2ZW50c0NvbW1lbnQnKTtcclxuXHJcbnZhciBzYXZlQ29tbWVudCA9IHJlcXVpcmUoJy4vc2F2ZUNvbW1lbnQnKTtcclxudmFyIGVkaXRDb21tZW50ID0gcmVxdWlyZSgnLi9lZGl0Q29tbWVudCcpO1xyXG5cclxudmFyIGRlbGV0ZUNvbW1lbnQgPSByZXF1aXJlKCcuL2RlbGV0ZUNvbW1lbnQnKTtcclxuXHJcbmV4cG9ydHMudmlld0NvbW1lbnRDb250cm9sbGVyID0gZnVuY3Rpb24oY3VycmVudElkKXtcclxuICAgIC8vIGV2ZW50c0NvbW1lbnQuZXZlbnRzQ29tbWVudCgpO1xyXG4gICAgY29tbWVudHNWaWV3KGN1cnJlbnRJZCk7IFxyXG4gICAgZnVuY3Rpb24gY29tbWVudHNWaWV3KF9pZCl7XHJcbiAgICB2YXIgY3ggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIGN4Lm9wZW4oXCJHRVRcIiwgIHJvb3QgKyAnL3Bvc3RzLycgKyBfaWQgKyAnL2NvbW1lbnRzJywgdHJ1ZSk7XHJcbiAgICBjeC5vbmxvYWQgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgdmFyIGNvbW1lbnRzID0gSlNPTi5wYXJzZShjeC5yZXNwb25zZVRleHQpO1xyXG4gICAgICBjb21tZW50cy5mb3JFYWNoKHNob3dDb21tZW50cyk7XHJcbiAgICB9XHJcbiAgICBjeC5zZW5kKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICB3aW5kb3cucGFyZW50Q29tbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWNvbnRleHQnKTtcclxuXHJcbiAgZnVuY3Rpb24gc2hvd0NvbW1lbnRzKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xyXG4gICAgdmFyIGNvbW1lbnQgPSBhcnJheVtpbmRleF07XHJcbiAgICBpZihjb21tZW50ICYmIHBhcmVudENvbW1lbnQpe1xyXG4gICAgICBhcHBlbmRpbmdDb21tZW50KGNvbW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYXBwZW5kaW5nQ29tbWVudChfY29tbWVudCkge1xyXG4gICAgdmFyIGNvbW1lbnRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbW1lbnRCb3guY2xhc3NOYW1lID0gJ21lZGlhJztcclxuICAgIHBhcmVudENvbW1lbnQuYXBwZW5kQ2hpbGQoY29tbWVudEJveCk7XHJcblxyXG4gICAgdmFyIGNvbW1lbnRCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb21tZW50Qm9keS5jbGFzc05hbWUgPSAnbWVkaWEtYm9keSc7XHJcblxyXG4gICAgdmFyIGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICBhdXRob3IuaW5uZXJIVE1MID0gX2NvbW1lbnQubmFtZSA7XHJcbiAgICBhdXRob3IuY2xhc3NOYW1lID0gJ21lZGlhLWhlYWRpbmcnO1xyXG5cclxuICAgIHZhciBlbWFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NtYWxsJyk7XHJcbiAgICBlbWFpbC5pbm5lckhUTUwgPSAnYnkgJyArIF9jb21tZW50LmVtYWlsO1xyXG5cclxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgYm9keS5pbm5lckhUTUwgPSBfY29tbWVudC5ib2R5O1xyXG5cclxuICAgIGNvbW1lbnRCb2R5LmFwcGVuZENoaWxkKGF1dGhvcik7XHJcbiAgICBjb21tZW50Qm9keS5hcHBlbmRDaGlsZChlbWFpbCk7XHJcbiAgICBjb21tZW50Qm9keS5hcHBlbmRDaGlsZChib2R5KTtcclxuXHJcbiAgICBjb21tZW50Qm94LmFwcGVuZENoaWxkKGNvbW1lbnRCb2R5KTtcclxuXHJcbiAgICB2YXIgYnRuRWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGJ0bkVkaXQuaW5uZXJIVE1MID0gJ2VkaXQnO1xyXG4gICAgYnRuRWRpdC5jbGFzc05hbWUgPSAnYnRuIGJ0bi1wcmltYXJ5JztcclxuICAgIHdpbmRvdy5ib29sRWRpdCA9IDE7XHJcbiAgICBidG5FZGl0Lm9uY2xpY2sgPSBlZGl0Q29tbWVudC5lZGl0Q29tbWVudDtcclxuXHJcbiAgICB2YXIgYnRuRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgYnRuRGVsZXRlLmlubmVySFRNTCA9ICdkZWxldGUnO1xyXG4gICAgYnRuRGVsZXRlLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnknO1xyXG4gICAgYnRuRGVsZXRlLm9uY2xpY2sgPSBkZWxldGVDb21tZW50LmRlbGV0ZUNvbW1lbnQ7XHJcblxyXG4gICAgdmFyIGJ0bkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBidG5Hcm91cC5jbGFzc05hbWUgPSAnYnRuLWdyb3VwJztcclxuICAgIGJ0bkdyb3VwLmFwcGVuZENoaWxkKGJ0bkVkaXQpO1xyXG4gICAgYnRuR3JvdXAuYXBwZW5kQ2hpbGQoYnRuRGVsZXRlKTtcclxuXHJcbiAgICBjb21tZW50Qm94LmFwcGVuZENoaWxkKGJ0bkdyb3VwKTtcclxuICAgIGNvbW1lbnRCb3guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKSk7XHJcbiAgfVxyXG4gICBzdWJtaXQub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGF1dGhvck5hbWUudmFsdWUgJiYgZW1haWwudmFsdWUgJiYgdGV4dENvbW1lbnQudmFsdWUpIHtcclxuICAgICAgdmFyIG5ld0NvbW1lbnQgPSB7XHJcbiAgICAgICAgbmFtZTogYXV0aG9yTmFtZS52YWx1ZSxcclxuICAgICAgICBlbWFpbDogZW1haWwudmFsdWUsXHJcbiAgICAgICAgYm9keTogdGV4dENvbW1lbnQudmFsdWVcclxuICAgICAgfTtcclxuICAgICAgYXBwZW5kaW5nQ29tbWVudChuZXdDb21tZW50KTtcclxuICAgICAgYXV0aG9yTmFtZS52YWx1ZSA9IG51bGw7XHJcbiAgICAgIGVtYWlsLnZhbHVlID0gbnVsbDtcclxuICAgICAgdGV4dENvbW1lbnQudmFsdWUgPSBudWxsO1xyXG4gICAgfWVsc2UgYWxlcnQoJ3BsZWFzZSwgZmlsbCBkYXRhJyk7XHJcbiAgfTtcclxufSJdfQ==
