(function () {
  var $root = 'http://jsonplaceholder.typicode.com';

  var $currentPostId = window.location.href.match(/[^/]*$/);


  $.get($root + '/posts/' + $currentPostId)
      .success(function(dataItems) {
          var $container = $('.post-author');
          $('#postTmpl').tmpl(dataItems).appendTo($container);

      })
      .error(function(err) {
          console.log('error', err);
      });

  $.get($root + '/comments', handler);

  function createComment(_data) {

      var $container = $('#comments-container')
      $('#commentTmpl').tmpl(_data).appendTo($container);

      $(".delete").on("click", function() {
        $(this).parent()
            .remove()
            .siblings('hr').remove();
      });

      $('.edit').on("click", function() {
        var body = $(this).parent().children('.media-body'),
            editableText = body.children('p');

        editableText.remove();

        if(!body.children().is('.editForm')){
          var editForm = $('<textarea rows="5"/>')
              .val(editableText.text())
              .addClass('form-control');
          body.append($('<div>').addClass('editForm').append(editForm));
        }
        body.parent().children('.save-btn').removeClass('hide');
      });

      $(".save").on("click", function () {
        var body = $(this).parent().children('.media-body'),
            editableText = body.children('.editForm');
        editableText.remove();
        $text = $('<p/>').append(editableText.children().val());
        body.append($text);
        $(this).addClass('hide');
      });
  };


    $('#submit').on("click", function() {
      var title = $("#inputTitle");
      var email = $("#inputEmail");
      var comment = $("#comment");
      var data = {
        title: title.val(),
        email: email.val(),
        comment: comment.val()
      }
      if ((title.val() != "") && (email.val() != "") && (comment.val() != "")) {
          createComment(data);
          title.val("");
          email.val("");
          comment.val("");
      } else {
          alert("проверьте введеные вами данные!");
      }
    });

  $('#commentForm').validator({
      init: function(){

      },
      success: function(){
          alert('lol')
      },
      error: function(){

      }
  })

      // var $l = Validator().runValidator($('#commentForm'));


  function handler(data) {
      // createComment(data.id, data.postId, data.name, data.email, data.body);
      $.each(data, function(key, value) {

          if (value.postId == $currentPostId) {
              createComment(value);
          }
      });

  }

})();
