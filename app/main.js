$(function($) {


    $root = 'http://jsonplaceholder.typicode.com';

    var $numPreLoad = 0;
    var $more = true;
    var $headlines = [];

    $.get($root + '/posts').success(function(res) {
        $headlines = res.slice(0, 10);
        $.each($headlines, function(key, value) {
            createPost(value.id, value.userId, value.title, value.body);
        });
    });

    $('.btn[data-type=loadMore]').on('click', function() {
        $numPreLoad += 10;
        var $limit = 10;
        $.get($root + '/posts')
            .success(function(res) {
                var $posts = res.slice($numPreLoad);
                var i = 0;
                if (Object.keys($posts).length < $limit + 1) {
                    $('.btn[data-type=loadMore]').addClass('disabled')
                    $more = false;
                }
                $.each($posts, function(key, value) {
                    if (i == $limit) {
                        return false;
                    }
                    $headlines.push(value);
                    createPost(value.id, value.userId, value.title, value.body);
                    i++;
                });
            })
            .error(function(err) {
                console.log("status" + err);
            });
    });

    function createPost(dataId, userId, title, body) {

        var $container = $('.col-md-8'),
            $post = $('<div class="post"/>'),
            $title = $("<h2 class='title'><a href='#/posts/" + dataId + "'>" + title + "</a></h2>"),
            $author = $('<p class="lead">' + 'author id:' + '<a href="#/posts">' + userId + '</a></p>'),
            $content = $('<p>').append(body),
            $span = $('<span/>').addClass('glyphicon glyphicon-chevron-right'),
            $aButton = $('<a href="#/posts/' + dataId + '"/>')
              .addClass('btn btn-primary')
              .append("Read more")
              .append($span),
            $hr = $('<hr/>');

        $post.append($title);
        $post.append($author);
        $post.append($content);
        $post.append($aButton);
        $post.append($hr);

        $container.append($post);
    }

    /* function handler(data) {
         $.each(data, function(key, value) {
             createOneElement(value.id, value.userId, value.title, value.body);
         });
     }*/

});
