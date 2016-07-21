var $root = 'http://jsonplaceholder.typicode.com';

var $currentPostId = window.location.href.match(/[^/]*$/);


$.get($root + '/posts/' + $currentPostId)
    .success(function(res) {
        var $authorPost = res;

        var $container = $('.post-author');

        var $title = $('<h2/>').append($authorPost.title);

        var $postBy = $('<p/>').append('by ' + $authorPost.userId);

        var $text = $('<p class="lead">').append($authorPost.body);

        $container.append($title).append($postBy).append($text);

    })
    .error(function(err) {
        console.log('error', err);
    });




$.get($root + '/comments', function(data) {
    handler(data);
});

function createOneElement(name, email, body) {


    $email = $('<small/>').append(email);
    $title = $('<h4/>').addClass('media-heading').append(name);
    $commentContent = $('<p/>').append(body);

    $divMediaBody = $('<div/>').addClass('media-body')
        .append($title)
        .append($email)

    $divMediaBody.append($commentContent);

    $buttonEdit = $('<input type="button" value="Edit"/>')
        .addClass('btn btn-primary editable')
        .on('click', function() {
          var body = $(this).parent().children('.media-body'),
              editableText = body.children('p');
          editableText.remove();
          $editForm = $('<textarea rows="5"/>')
              .val(editableText.text())
              .addClass('form-control');
          body.append($('<div/>').append($editForm));
        });
    $buttonDelete = $('<input type="button" value="Delete"/>')
        .addClass('btn btn-danger')
        .attr('id', 'delete')
        .css('margin-left', '5px')
        .on('click', function() {
            $(this).parent()
                .remove()
                .siblings('hr').remove();
        });

    $divMedia = $('<div/>').addClass('comment');
    $divMedia.append($divMediaBody);
    $divMedia.append($buttonEdit);
    $divMedia.append($buttonDelete);

    $(".comments").append($divMedia.append('<hr/>'));

}

function saved() {
    var title = $("#inputTitle");
    var email = $("#inputEmail");
    var comment = $("#comment");
    if ((title.val() != "") && (email.val() != "") && (comment.val() != "")) {
        createOneElement(title.val(), email.val(), comment.val());
        title.val("");
        email.val("");
        comment.val("");
    } else {
        alert("проверьте введеные вами данные!");
    }
}

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
    // createOneElement(data.id, data.postId, data.name, data.email, data.body);
    $.each(data, function(key, value) {

        if (value.postId == $currentPostId) {
            createOneElement(value.name, value.email, value.body);
        }
    });

}
