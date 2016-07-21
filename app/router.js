Path.map('#/').to(function() {
    $.get('templates/home.html', function(data) {
        $("#view").empty();
        $('#view').append(data);
    });
});

Path.map('#/posts/:id').to(function() {
    $.get('templates/messages.html', function(data) {
        $('#view').empty();
        $('#view').append(data);
    });
});


Path.root('#/');

Path.listen();
