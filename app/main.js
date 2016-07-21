$(function($) {


    $root = 'http://jsonplaceholder.typicode.com';

    var $numPreLoad = 0;
    var $more = true;
    var $headlines = [];

    $.get($root + '/posts').success(function(res) {
        $headlines = res.slice(0, 10);
        $.each($headlines, function(key, value) {
            createPost(value);
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
                    createPost(value);
                    i++;
                });
            })
            .error(function(err) {
                console.log("status" + err);
            });
    });

    function createPost(_dataItems) {
        var $container = $('.col-md-8');
        $('#postTmpl').tmpl(_dataItems).appendTo($container);
        $('#readMoreTmpl').tmpl(_dataItems).appendTo($container);
    }

    /* function handler(data) {
         $.each(data, function(key, value) {
             createOneElement(value.id, value.userId, value.title, value.body);
         });
     }*/

});
