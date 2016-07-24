(function() {
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

            $('.delete').click(function() {
                $x = ($(this).attr('id'));
                var root = 'http://jsonplaceholder.typicode.com';

                $.ajax({
                    url: root + '/posts/1',
                    method: 'DELETE'
                }).then(function() {
                    $qwe = $("#" + $x);
                    $qwe.remove();

                });
            });

            $('.edit').on("click", function() {
                var body = $(this).parent().children('.media-body'),
                    editableText = body.children('p'),
                    x="",
                    x = editableText.text();
                console.log(x);

                editableText.remove();

                if (!body.children().is('.editForm')) {
                    var editForm = $('<textarea rows="5"/>')
                        .val(editableText.text())
                        .addClass('form-control');
                    body.append($('<div>').addClass('editForm').append(editForm));
                }
                body.parent().children('.save-btn').removeClass('hide');
                body.parent().children('.cancel-btn').removeClass('hide');

//                 $(".cancel").on("click", function() {
// var editableText = body.children('.editForm');
// editableText.remove();
// $text = $('<p/>').append(x);
// body.append($text);
// $(this).addClass('hide');
// $('.save-btn').addClass('hide');

// });            
});

            $(".save").on("click", function() {
                var body = $(this).parent().children('.media-body'),
                    editableText = body.children('.editForm');
                editableText.remove();

                $text = $('<p/>').append(editableText.children().val());
                body.append($text);
                $(this).addClass('hide');
                $('.cancel-btn').addClass('hide');
            });
            // $('.edit').on("click", function() {
            //     $edit_id = ($(this).attr('id'));

            //     var body = $(this).parent().children('.media-body'),
            //         editableText = body.children('p'),
            //         x = editableText.text();
            //         $('textarea#'+$edit_id).val(x);
            //     editableText.addClass('hide');
            //     $('.editForm[id=' + $edit_id + ']').removeClass('hide');
            //     body.parent().children('.save-btn').removeClass('hide');
            //     body.parent().children('.cancel-btn').removeClass('hide');

            //     $(".cancel").on("click", function() {
            //         editableText.text(x);
            //         $('textarea#'+$edit_id).val("");
            //         $('.editForm[id=' + $edit_id + ']').addClass('hide');
            //         editableText.removeClass('hide');
            //         $(this).addClass('hide');
            //         $('.save-btn').addClass('hide');

            //     });
            //     $(".save").on("click", function() {
            //         editableText.text($('textarea#' + $edit_id).val());
            //         $('.editForm[id=' + $edit_id + ']').addClass('hide');
            //         editableText.removeClass('hide');
            //         $(this).addClass('hide');
            //         $('.cancel-btn').addClass('hide');
            //     });
            // });
};

            $('#submit').on("click", function() {


                var title = $("#inputTitle");
                var email = $("#inputEmail");
                var comment = $("#comment");
                if ((title.val() != "") && (email.val() != "") && (comment.val() != "")) {
                    $.ajax('http://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        data: {
                            name: title.val(),
                            email: email.val(),
                            body: comment.val()
                        }
                    }).then(function(data) {
                        createComment(data);
                        console.log(data);
                    });
                    title.val("");
                    email.val("");
                    comment.val("");
                } else {
                    alert("проверьте введеные вами данные!");
                }
            });

            $('#commentForm').validator({
                init: function() {

                },
                success: function() {
                    alert('lol')
                },
                error: function() {

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
